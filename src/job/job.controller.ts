import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common/decorators';
import { JobService } from './job.service';

@Controller('job')
export class JobController {

    constructor(private jobService : JobService){}

    @Post('/creatjob')
    creatJob(@Body() jobDto : any){
        console.log(jobDto)
        return  this.jobService.saveJob(jobDto)
    }

    @Get('/alljobs')
    findAllJobs(){
        return this.jobService.getAllJobs()
    }

    @Get('/:id')
    getJobById(@Param('id') id :string){
        return this.jobService.getJobById(id)
    }

}


