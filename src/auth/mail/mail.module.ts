import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
    imports:[
        MailerModule.forRoot({
            transport: {
                host: 'sudeshsurve223@gmail.com',
                secure: false,
                auth: {
                    user: 'rodrick.abernathy46@ethereal.email',
                    pass: 'Nx2pbf8pr5fQRwXGB9'
                },
              },
              defaults: {
                from: '"No Reply" <noreply@example.com>',
              },
        })
    ]
    ,
  providers: [MailService],
  exports: [MailService], 
})
export class MailModule {}
