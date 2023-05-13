import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpLoggingInterceptor } from '@core/interceptor';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { validationSchema } from '@core/config/joi';
import { prometheusProvider } from '@core/config/prometheus';
import { databaseConfig } from '@core/config/database';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    PrometheusModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: validationSchema
    }),
    MongooseModule.forRootAsync({
      useFactory: () => databaseConfig(),
    }),
    AuthModule,
    UserModule,
  ],
  providers: [
    ...prometheusProvider
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggingInterceptor).exclude(
      { path: 'metrics', method: RequestMethod.GET },
      { path: 'health', method: RequestMethod.GET },
      { path: 'docs', method: RequestMethod.GET },
    )
    .forRoutes('*');
  }
}
