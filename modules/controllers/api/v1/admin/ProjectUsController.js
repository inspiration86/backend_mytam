const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ProjectUsController extends Controller {
    index(req , res) {
        this.model.ProjectUs.find({}).sort({title:-1}).exec((err , projectus) => {
            if(err) throw err;
            if(projectus) {
                return res.json ({
                    data: projectus,
                    success: true
                });
            }
            res.json({
                data : 'هیچ اطلاعاتی وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'آیدی وارد شده نامعتبر است').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.ProjectUs.findById(req.params.id , (err , projectus) => {
            if(projectus) {
                return res.json({
                    data : projectus,
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
        req.checkBody('image' , ' فیلد تصویر نمی تواند خالی بماند').notEmpty();
        req.checkBody('title' , ' فیلد عنوان نمی تواند خالی بماند').notEmpty();
        req.checkBody('feature' , ' فیلد ویژگی ها نمی تواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'feature title');

        if(this.showValidationErrors(req, res))
            return;

        let newProjectUs = new this.model.ProjectUs({
            image : req.body.image,
            title : req.body.title,
            feature : req.body.feature,
            keyword : req.body.keyword
        })
        newProjectUs.save(err => {
            if(err) throw err;
            res.json('اطلاعات با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.ProjectUs.findByIdAndUpdate(req.params.id , {
            image : req.body.image,
            title : req.body.title,
            feature : req.body.feature,
            keyword : req.body.keyword
        }, (err , projectus) => {
            if(err) throw err;

            if(projectus) {
                return res.json({
                    data : 'اطلاعات با موفقیت آپدیت شد',
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
        this.model.ProjectUs.findByIdAndRemove(req.params.id , (err , projectus) => {
            if(err) throw err;
            if(projectus) {
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