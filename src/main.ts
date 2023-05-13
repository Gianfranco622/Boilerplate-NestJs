import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { loggerConfig } from '@core/config/logger';
import { initSwagger } from '@core/config/swagger';
import cors from 'cors';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule, loggerConfig);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.use(cors());
  app.use(helmet());
  app.use(helmet.hidePoweredBy());
  initSwagger(app);
  await app.listen(process.env.PORT);

  logger.log(`Aplication Listening : ${await app.getUrl()}`);
}
bootstrap();
