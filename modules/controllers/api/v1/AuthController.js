const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require('bcrypt');

module.exports = new class AuthController extends Controller {
    register(req , res) {

        req.checkBody('email' , 'فیلد ایمیل نمی تواند خالی بماند').notEmpty();
        req.checkBody('password' , 'فیلد رمز عبور نمی تواند خالی بماند').notEmpty();
        req.checkBody('email' , 'فرمت ایمیل وارد شده صحیح نمی باشد').isEmail();

        if(this.showValidationErrors(req, res))
            return;
        this.model.User({
            user_type:req.body.user_type,
            email : req.body.email,
            password : req.body.password
        }).save(err => {
            if(err) {
                if(err.code == 11000) {
                    return res.json({
                        data : 'این ایمیل قبلا ثبت شده است',
                        success : false
                    })
                } else {
                    throw err;
                }
            }
            return res.json({
                data : 'ثبت نام شما با موفقیت انجام شد',
                success : true
            });
        })
    }

    login(req , res) {

            req.checkBody('email', 'Email field required').notEmpty();
            req.checkBody('password', 'Password field required').notEmpty();

            if (this.showValidationErrors(req, res))
                return;
            this.model.User.findOne({email: req.body.email}, (err, user) => {
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
                            data: new UserTransform().transform(user, true),
                            success: true
                        });
                    })
            })
    }
}