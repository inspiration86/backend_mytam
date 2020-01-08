const Controller = require(`${config.path.controller}/Controller`);
const AdminUserTransform = require(`${config.path.transform}/v1/AdminUserTransform`);
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
module.exports = new class AdminAuthController extends Controller {
    register(req , res) {
        req.checkBody('role' , 'فیلد نقش نمی تواند خالی بماند').notEmpty();
        req.checkBody('email' , 'فیلد ایمیل نمی تواند خالی بماند').notEmpty();
        req.checkBody('password' , 'فیلد رمز عبور نمی تواند خالی بماند').notEmpty();
        req.checkBody('email' , 'فرمت ایمیل صحیح نمی باشد').isEmail();
        req.checkBody('access_level' , 'فیلد سطح دسترسی نمی تواند خالی بماند').notEmpty();

        if(this.showValidationErrors(req, res))
            return;
        this.model.AdminUser({
            type:req.body.type,
            email : req.body.email,
            password : req.body.password,
            role:req.body.role,
            access_level:req.body.access_level
        }).save(err => {
            if(err) {
                if(err.code == 11000) {
                    return res.json({
                        data : 'ایمیل وارد شده قبلا ثبت شده است',
                        success : false
                    })
                } else {
                    throw err;
                }
            }
            return res.json({
                data : 'عضویت با موفقیت انجام شد',
                success : true
            });
        })
    }
    login(req , res) {
        req.checkBody('email', 'فیلد ایمیل نمی تواند خالی بماند').notEmpty();
        req.checkBody('password', 'فیلد پسورد نمی تواند خالی بماند').notEmpty();
        req.checkBody('recaptcha', 'فیلد کپچا نمی تواند خالی بماند').notEmpty();

        if (this.showValidationErrors(req, res))
            return;
        if(this.recaptcha(req.body.recaptcha,req.connection.remoteAddress)) {
            //search user
            this.model.AdminUser.findOne({email: req.body.email}, (err, user) => {
                if (err) throw err;
                console.log(user);
                if (user == null)
                    return res.status(422).json({
                        data: 'اطلاعات وارد شده صحیح نمی باشد',
                        success: false
                    });
                bcrypt.compare(req.body.password, user.password, (err, status) => {

                    if (!status)
                        return res.status(422).json({
                            success: false,
                            data: 'رمز عبور وارد شده صحیح نمی باشد'
                        })
                    return res.json({
                        data: new AdminUserTransform().transform(user, true),
                        success: true
                    });
                })
            })
        }
    }

    async recaptcha(recaptcha,connection){
        // Secret key
        const secretKey = '6LcbOcwUAAAAAPv_Rc-1LmA3-n4hAJISCYFQVfaa';
        // Verify URL
        const query = stringify({
            secret: secretKey,
            response: recaptcha,
            remoteip: connection
        });
        const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
        // Make a request to verifyURL
        const body =await fetch(verifyURL).then(res => res.json()).catch(error=> console.log(error));
        // If not successful
        if (body.success !== undefined && !body.success)
            return 'true';
        else
        return 'false';
    }
}