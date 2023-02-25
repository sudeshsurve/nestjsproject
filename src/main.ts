import { NestFactory  } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

declare const module: any
async function bootstrap() {
  const app = await NestFactory.create(AppModule );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  await app.listen(3000 ,()=> console.log('listen on 3000')
  );
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  } 
}
bootstrap();
