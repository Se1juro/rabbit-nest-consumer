import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBIT_HOST } from './constants/rabbit.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RABBIT_HOST],
      queue: 'users_queue',
      noAck: false,
      queueOptions: {
        durable: true, // Persist queue when restart
      },
      persistent: true,
    },
  });

  await app.startAllMicroservices();

  app.setGlobalPrefix('/api/consumer');

  await app.listen(process.env.PORT);
}
bootstrap();
