import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {JwtAuthGuard} from "./auth/guards/jwt-auth.guard";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder().setTitle("TodoApp").setDescription("Todo NestApp Rest Api Docs")
      .setVersion("1. 0")
      .addBearerAuth({
        type:"http",
        scheme:"bearer",
        bearerFormat:"JWT",
        name:"JWT",
        description:"Enter JWT token",
        in:"header"
      },
          "JWT-auth"
          ).build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document)
    const PORT = process.env.PORT || 5000
  await app.listen(PORT, ()=> {
      console.log(`runing api in mode ${process.env.NODE_ENV} on port ${PORT}`)
  });
}
bootstrap();

