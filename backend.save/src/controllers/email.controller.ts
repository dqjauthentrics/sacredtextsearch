import {Body, JsonController, OnUndefined, Post} from 'routing-controllers';
import {EmailInterface} from '../interfaces/email.interface';

var nodemailer = require("nodemailer");

@JsonController('/email')
export class EmailController {

    @Post('/send')
    @OnUndefined(404)
    async send(@Body() postedData: EmailInterface) {
        // console.log('to: ' + postedData.email);
        let testAccount = await nodemailer.createTestAccount();
        // let transporter = await nodemailer.createTransport({
        //     host: "smtp.ethereal.email",
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: testAccount.user, // generated ethereal user
        //         pass: testAccount.pass // generated ethereal password
        //     }
        // });
        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {user: 'dqj@authentrics.com', pass: 'Zarkoff!'}
        });
        return transporter.sendMail({
            from: 'Sacred Text Search <dqj@authentrics.com>',
            to: 'dqj@authentrics.com',
            subject: 'Contact from ' + postedData.name,
            html: '<div>' + postedData.email + '</div><div>' + postedData.body + '</div>'
        });
    }
}
