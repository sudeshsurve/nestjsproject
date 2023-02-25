import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { job, jobSchema } from 'src/schema/job.schema';
import { UserModule } from 'src/user/user.module';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports:[ UserModule ,   MongooseModule.forFeature([{name : job.name , schema : jobSchema}  ])],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
