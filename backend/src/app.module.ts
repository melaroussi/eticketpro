import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './email/email.module';
import { AccessControlModule } from './access-control/access-control.module';
import { MqttModule } from './mqtt/mqtt.module';
import { ApiController } from './api/api.controller';

@Module({
  imports: [
    DatabaseModule, 
    EmailModule,
    AccessControlModule,
    MqttModule
  ],
  controllers: [ApiController],
})
export class AppModule {}
