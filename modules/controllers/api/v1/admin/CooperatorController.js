const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class CooperatorController extends Controller {
    index(req , res) {
        this.model.Cooperator.find({}).sort({name:-1}).exec((err , cooperator) => {
            if(err) throw err;
            if(cooperator) {
                return res.json ({
                    data: cooperator,
                    success: true
                });

            }
                res.json({
                    data: 'یافت نشد',
                    success: false
                })

        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Cooperator.findById(req.params.id , (err , cooperator) => {
            if(cooperator) {
                return res.json({
                    data : cooperator,
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
        req.checkBody('image' , ' تصویر نمی تواند خالی بماند').notEmpty();
        req.checkBody('name' , 'نام نمی تواند خالی بماند').notEmpty();
        this.escapeAndTrim(req , 'name');
        if(this.showValidationErrors(req, res))
            return;
        let newCooperator = new this.model.Cooperator({
            name : req.body.name,
            image : req.body.image
        })
        newCooperator.save(err => {
            if(err) throw err;
            res.json('اطلاعات با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Cooperator.findByIdAndUpdate(req.params.id ,{
            image: req.body.image,
            name: req.body.name
        }, (err , cooperator) => {
            if(err) throw err;
            if(cooperator) {
                return res.json({
                    data : ' اطلاعات با موفقیت آپدیت شد',
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
        this.model.Cooperator.findByIdAndRemove(req.params.id , (err , cooperator) => {
            if(err) throw err;
            if(cooperator) {
                return res.json({
                    data : 'اطلاعات با موفقیت حذف شد',
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