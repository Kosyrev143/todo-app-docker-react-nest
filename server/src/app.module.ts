import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath:['.local.env']}),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type:'postgres',
        host:'postgresql_db',
        port:5432,
        username:'postgres',
        password:'postgres',
        synchronize:configService.get<boolean>('DB_SYNC'),
        logging:configService.get<boolean>('DB_LOGGING'),
        database:'nestjs_docker',
        entities:[__dirname + '/**/*.entity{.js, .ts}']
      }),
      inject:[ConfigService],
    }),
    UserModule,
    TodoModule,
    AuthModule
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
