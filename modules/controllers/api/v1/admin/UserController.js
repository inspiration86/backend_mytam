const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require('bcrypt');

module.exports = new class UserController extends Controller {
    index(req , res) {
        this.model.User.find({}).sort({createdAt:'desc'}).exec((err , user) => {
            if(err) throw err;
            if(user) {
                return res.json ({
                    data: user,
                    success: true
                });
            }
            res.json({
                data : 'هیچ کاربری وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;

        this.model.User.findById(req.params.id , (err , user) => {
            if(user) {
                return res.json({
                    data : user,
                    success : true
                })
            }

            res.json({
                data : 'یافت نشد',
                success : false
            })
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        let hash = bcrypt.hashSync(req.body.password, 10);
        this.model.User.findByIdAndUpdate(req.params.id ,{ password:hash}, (err , user) => {
            if(err) throw err;
            if(user) {
                return res.json({
                    data : ' اطلاعات با موفقیت آپدیت شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین کابری وجود ندارد',
                success : false
            });
        });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.User.findByIdAndRemove(req.params.id , (err , user) => {
            if(err) throw err;
            if(user) {
                return res.json({
                    data : 'کاربر با موفقیت حذف شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین کاربری وجود ندارد',
                success : false
            });
        });
    }
}