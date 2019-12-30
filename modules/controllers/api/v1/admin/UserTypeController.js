const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class UserTypeController extends Controller {
    index(req , res) {
        this.model.User_Type.find({}).sort({user_type:-1}).exec((err , usertype) => {
            if(err) throw err;
            if(usertype) {
                return res.json ({
                    data: usertype,
                    success: true
                });
            }
            res.json({
                data : 'هیچ نوع کاربری وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' ,  'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;

        this.model.User_Type.findById(req.params.id , (err , usertype) => {
            if(usertype) {
                return res.json({
                    data : usertype,
                    success : true
                })
            }

            res.json({
                data : 'چنین نوع کاربری وجود ندارد',
                success : false
            })
        })
    }

    store(req , res) {
        req.checkBody('user_type' , 'نوع کاربر نمی تواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'user_type');

        if(this.showValidationErrors(req, res))
            return;

        let newUserType = new this.model.User_Type({
            user_type : req.body.user_type

        })
        newUserType.save(err => {
            if(err) throw err;
            res.json('نوع کاربر با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.User_Type.findByIdAndUpdate(req.params.id ,{ user_type : req.body.user_type}, (err , usertype) => {
            if(err) throw err;

            if(usertype) {
                return res.json({
                    data : ' نوع کاربر با موفقیت آپدیت شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین نوع کاربری وجود ندارد',
                success : false
            });
        });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.User_Type.findByIdAndRemove(req.params.id , (err , usertype) => {
            if(err) throw err;
            if(usertype) {
                return res.json({
                    data : 'نوع کاربر با موفقیت حذف شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین نوع کاربری وجود ندارد',
                success : false
            });
        });
    }
}