const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class RoleController extends Controller {
    index(req , res) {
        this.model.Role.find({}).sort({role:-1}).exec((err , role) => {
            if(err) throw err;
            if(role) {
                return res.json ({
                    data: role,
                    success: true
                });
            }
            res.json({
                data : 'هیچ نقشی وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'آیدی وارد شده نامعتبر است').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Role.findById(req.params.id , (err , role) => {
            if(role) {
                return res.json({
                    data : role,
                    success : true
                })
            }

            res.json({
                data : 'یافت نشد',
                success : false
            })
        })
    }

    store(req , res) {
        req.checkBody('role' , ' نقش نمی تواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'role ');

        if(this.showValidationErrors(req, res))
            return;

        let newRole = new this.model.Role({
            role : req.body.role
        })
        newRole.save(err => {
            if(err) throw err;
            res.json('نقش با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Role.findByIdAndUpdate(req.params.id , {
            role : req.body.role
        }, (err , role) => {
            if(err) throw err;

            if(role) {
                return res.json({
                    data : 'نقش با موفقیت آپدیت شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین اطلاعاتی وجود ندارد',
                success : false
            });
        });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Role.findByIdAndRemove(req.params.id , (err , role) => {
            if(err) throw err;
            if(role) {
                return res.json({
                    data : 'نقش با موفقیت حذف شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین اطلاعاتی وجود ندارد',
                success : false
            });
        });
    }

}