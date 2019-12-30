const Controller = require(`${config.path.controller}/Controller`);
const AdminUserTransform = require(`${config.path.transform}/v1/AdminUserTransform`);
const bcrypt = require('bcrypt');
module.exports = new class AdminAuthController extends Controller {
    register(req , res) {
        req.checkBody('role' , 'فیلد نقش نمی تواند خالی بماند').notEmpty();
        req.checkBody('email' , 'فیلد ایمیل نمی تواند خالی بماند').notEmpty();
        req.checkBody('password' , 'فیلد رمز عبور نمی تواند خالی بماند').notEmpty();
        req.checkBody('email' , 'فرمت ایمیل صحیح نمی باشد').isEmail();

        if(this.showValidationErrors(req, res))
            return;
        this.model.AdminUser({
            type:req.body.type,
            email : req.body.email,
            password : req.body.password,
            role:req.body.role
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

        if (this.showValidationErrors(req, res))
            return;
        this.model.AdminUser.findOne({email: req.body.email}, (err, user) => {
            if (err) throw err;

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