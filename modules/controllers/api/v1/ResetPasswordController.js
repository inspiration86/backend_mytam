const Controller = require(`${config.path.controller}/Controller`);
const randomstring  = require('randomstring');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
module.exports = new class ResetPasswordController extends Controller {
    resetpassword(req, res) {
        this.model.User.findOne({email:req.body.email}).exec((err , user) => {
            if(err) throw err;
            if(user) {
                ///new pass
                let newpassword=randomstring.generate({charset:'MytamIr1398',length:10});
                console.log(newpassword)
                let hash = bcrypt.hashSync(newpassword, 10);
                console.log(bcrypt.compareSync(newpassword, hash));
                console.log(hash)
                console.log(user.email)
                console.log(user.id)
                ///update
                this.model.User.findByIdAndUpdate(user.id,{ password:hash}, (err , user) => {
                    if(err) throw err;
                    if(user) {
                        //mail new pass
                        const config = {
                            mailserver: {
                                host: 'smtp.mailtrap.io',
                                port: 2525,
                                secure: false,
                                auth: {
                                    user: 'goodarzi@gmail.com',
                                    pass: '8860e8860G'
                                }
                            },
                            mail: {
                                from: 'arka.goodarzi@gmail.com',
                                to: user.email,
                                subject: 'رمز عبور جدید',
                                text: newpassword
                            }
                        };

                        const sendMail = async ({ mailserver, mail }) => {
                            // create a nodemailer transporter using smtp
                            let transporter = nodemailer.createTransport(mailserver);
                            // send mail using transporter
                            let info = await transporter.sendMail(mail);
                            console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
                        };
                        sendMail(config).catch(console.error);
                        // let transporter = nodemailer.createTransport({
                        //     service: 'gmail',
                        //     secure: false,
                        //     host: 'smtp.mailtrap.io',
                        //     port: 2525,
                        //     auth: {
                        //         user: 'arka.goodarzi@gmail.com',
                        //         pass: '8860e8860G'
                        //     }
                        // });
                        // let mailOptions = {
                        //     from: 'arka.goodarzi@gmail.com',
                        //     to:user.email,
                        //     subject: 'بازیابی رمز عبور حساب کاربری شما',
                        //     text:newpassword
                        // };
                        // transporter.sendMail(mailOptions,function(err,info){
                        //     if (err) return new Error('خطا در ارسال ایمیل...');
                        //     else
                        // {                             console.log(info)
                        //     return res.json({
                        //         info:info,
                        //         data: 'رمز عبور با موفقیت ریست شد',
                        //         success: true,
                        //         message: 'لطفا ایمیل خود را جهت مشاهده رمز عبور جدبد چک نمایید'
                        //     })
                        //
                        // }
                        //     })
                        }else
                    res.status(404).json({
                        data : 'چنین کابری وجود ندارد',
                        success : false
                    });
                });
                }
        });

    }
}


