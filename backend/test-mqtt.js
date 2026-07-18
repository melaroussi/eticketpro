const mqtt = require('mqtt');

// Connect to the Mosquitto container inside the Docker network
const client = mqtt.connect('mqtt://mqtt-broker:1883');

const reqTopic = 'zoo/validators/scan';
const resTopic = 'zoo/validators/response/10.10.10.10';

client.on('connect', () => {
  console.log('Connected to MQTT Broker. Subscribing to response topic...');
  
  // 1. Subscribe to the response topic
  client.subscribe(resTopic, (err) => {
    if (err) {
      console.error('Subscription error:', err);
      process.exit(1);
    }
    console.log(`Subscribed to: ${resTopic}`);
    
    // 2. Publish a mock scan event for a valid transaction
    const mockScan = {
      ticketSellId: 1,
      ticketId: 1,
      readerIP: '10.10.10.10'
    };
    
    console.log(`Publishing scan request to ${reqTopic}:`, mockScan);
    client.publish(reqTopic, JSON.stringify(mockScan), { qos: 1 });
  });
});

client.on('message', (topic, message) => {
  console.log(`\n=== MQTT RESPONSE RECEIVED ===`);
  console.log(`Topic: ${topic}`);
  console.log(`Payload: ${message.toString()}`);
  console.log(`=============================\n`);
  
  client.end();
  process.exit(0);
});

// Timeout after 6 seconds
setTimeout(() => {
  console.error('Test timed out without receiving an MQTT response from the NestJS service.');
  client.end();
  process.exit(1);
}, 6000);
