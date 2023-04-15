import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { job, jobDocument } from 'src/schema/job.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JobService {
    constructor(@InjectModel(job.name) private jobModel: Model<jobDocument>, private userService: UserService) { }

    async saveJob(jobDto: any): Promise<any> {
        try {
            let user = await this.userService.findOne(jobDto.userId)
            if (!user) {
                throw new NotFoundException('User not found')
            }
            const job = new this.jobModel({ ...jobDto, Employer: user._id })
            return await job.save()
        } catch (error) {
            console.log(error.response);
        }
    }

    async getAllJobs() {
        return new Promise(async(resolve, reject) => {
            try {   
                const job = await this.jobModel.aggregate([{$lookup:
                     {
                      from:"users",
                      localField: "Employer",
                      foreignField: "_id",  
                      as: "data"
                    }}])
                if (!job) {
                    throw new NotFoundException("Job not found")
                }
                 resolve(job)
            } catch (error) {
                resolve({error: error.response})
            }
        })
    }

    async getJobById (id:string){
        try {
            const job = await this.jobModel.findOne({_id:id})
            console.log(job);   
            if(!job){
                throw new NotFoundException("Job not found")
            }
            return job  
            
        } catch (error) {
            return error
        }
    }

    // wing wwise query
    // db.members.aggregate([{$group:{_id:"$propertyDetails.wing", members:{$push:{name:"$firstName"}}}}])
    // getWing Wise members with full information
    //  db.members.aggregate([{$group:{_id:"$propertyDetails.wing", members:{$push:"$$ROOT"}}}])
        
}
