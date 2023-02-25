import { BadRequestException, Injectable, Logger, NotFoundException, Query, RequestTimeoutException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user, userDocument } from 'src/schema/user.schema';
import { check } from 'email-existence';
import { MailService } from 'src/auth/mail/mail.service';

@Injectable()
export class UserService {
    constructor(@InjectModel(user.name) private userModel: Model<userDocument> , private mailService : MailService) { }

    async tarnsport_mailer(){
      
    }


    IscheckEmail(email: string, cb) {
        check(email, async (err, res) => {
            const data = await res
            cb(data)
        })
    }

    async createUser(userDto: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { email, phone } = userDto
                let data = new Promise((resolve, reject) => {
                    this.IscheckEmail(email, function (res: any) {
                        resolve(res)
                    })
                })
                let isemailvalid = await data
                if (!isemailvalid) {
                    resolve({ status: false, message: "Invalid email" })
                }   
                const user = await this.userModel.find({ $or: [{ email: email }, { phone: phone }] })
                console.log(user, "users");
                if (user.length >= 1){
                    throw new NotFoundException('user already exists')
                }
                else {
                  const saveuser =  await this.userModel.create(userDto)
                     resolve(saveuser);
                    // resolve(this.mailService.sendUserConfirmation(saveuser))
                }
            } catch (error) {
                resolve(error.response)
            }
        })
    }


    async findOne(id: string): Promise<any> {
        try {
            const user = await this.userModel.findOne({ _id: id })
            if (!user) {
                throw new NotFoundException('user not found')
            }
            return user

        } catch (error) {
            return error.response
        }

    }

    async get_all_users(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const user = await this.userModel.find()
            if (user.length >= 1) {
                resolve(user.filter(user => !user.isdeleted))
            }
            resolve('NO CONTENT')
        })
    }


    async serach_data(date: any) {
        try {
            const { startdate, enddate } = date
            console.log(date);
            if (startdate == '' || enddate == '') {
                throw new BadRequestException('Not Found')
            }
            let dataa = await this.userModel.find({
                paid_date: {
                    $gte: new Date(new Date(startdate)),
                    $lte: new Date(new Date(enddate))
                }
            }).sort({ paid_date: 'asc' })
            return dataa
        } catch (error) {
            return error.response
        }


    }

    async remove_user(id: string) {
        try {
            const remove = await this.userModel.updateOne({ _id: id }, { isdeleted: true }).exec()
            console.log(remove)
            return remove
        } catch (error) {
            return error.response
        }
    }

    async search_by_query(query: string) {
        return new Promise(async (reslove, reject) => {
            try {
                const user = await this.userModel.find({
                    "$or": [
                        { "name": { $regex: query } },
                    ]
                })
                if (user.length >= 1) {
                    const user_data = user.filter(user => { return !user.isdeleted })
                    if (user_data.length >= 1) {
                        reslove(user_data)
                    }
                    else {
                        throw new NotFoundException('user not found')
                    }
                } else {
                    throw new NotFoundException('user not found')
                }
            } catch (error) {
                reslove(error.response)
            }
        })
    }











}


