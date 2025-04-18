import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function serializeBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === 'bigint' ? Number(value) : value,
    ),
  );
}

function setupSwagger(nestApp: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Banking API Documentation')
    .setDescription('The Banking API documentation with Domain-Driven Design')
    .setVersion('1.0')
    .addBearerAuth();

  const document = SwaggerModule.createDocument(nestApp, options.build());
  const serializedDocument = serializeBigInt(document);
  SwaggerModule.setup('docs', nestApp, serializedDocument, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      displayOperationId: true,
      displayRequestDuration: true,
      filter: true,
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
