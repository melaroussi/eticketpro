import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { AccessControlService } from '../access-control/access-control.service';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: mqtt.MqttClient;
  private readonly logger = new Logger(MqttService.name);

  // Load configuration from environment variables with safe defaults
  private readonly brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com:1883';
  private readonly reqTopic = process.env.MQTT_REQUEST_TOPIC || 'museum/validators/scan';
  private readonly resTopic = process.env.MQTT_RESPONSE_TOPIC || 'museum/validators/response';

  constructor(private readonly accessControl: AccessControlService) {}

  onModuleInit() {
    this.logger.log(`Connecting to MQTT broker at ${this.brokerUrl}...`);
    this.client = mqtt.connect(this.brokerUrl, {
      reconnectPeriod: 5000,
    });

    this.client.on('connect', () => {
      this.logger.log(`Connected to MQTT broker. Subscribing to ${this.reqTopic}...`);
      this.client.subscribe(this.reqTopic, (err) => {
        if (err) {
          this.logger.error(`Failed to subscribe to ${this.reqTopic}`, err);
        } else {
          this.logger.log(`Subscribed to topic ${this.reqTopic}`);
        }
      });
    });

    this.client.on('message', async (topic, message) => {
      if (topic === this.reqTopic) {
        try {
          const payload = JSON.parse(message.toString());
          this.logger.log(`Received MQTT scan request: ${message.toString()}`);
          
          const { ticketSellId, ticketId, readerIP } = payload;
          
          // Validate and register the scan using the shared AccessControlService
          const verificationResult = await this.accessControl.validateAndRegisterScan(
            ticketSellId,
            ticketId,
            readerIP
          );

          // Publish validation response payload
          const responsePayload = {
            ticketSellId,
            ticketId,
            readerIP,
            ...verificationResult
          };
          
          // Send specific response back to this reader IP (e.g., zoo/validators/response/192.168.1.50)
          const targetTopic = `${this.resTopic}/${readerIP || 'broadcast'}`;
          this.client.publish(targetTopic, JSON.stringify(responsePayload), { qos: 1 });
          this.logger.log(`Published validation result to MQTT topic ${targetTopic}`);
        } catch (error) {
          this.logger.error('Failed to process MQTT message payload', error);
        }
      }
    });

    this.client.on('error', (err) => {
      this.logger.error('MQTT Client error', err);
    });

    this.client.on('close', () => {
      this.logger.warn('MQTT Connection closed');
    });
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.end();
      this.logger.log('MQTT connection ended');
    }
  }
}
