import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nest'),
    AuthModule,
    UserModule,
    JobModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
