const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class GroupArticleController extends Controller {
    index(req , res) {
        this.model.GroupArticle.find({}).sort({group_name:-1}).exec((err , grouparticle) => {
            if(err) throw err;
            if(grouparticle) {
                return res.json ({
                    data: grouparticle,
                    success: true
                });
            }
            res.json({
                data : 'هیچ گروه مقاله ای وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'آیدی وارد شده نامعتبر است').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.GroupArticle.findById(req.params.id , (err , grouparticle) => {
            if(grouparticle) {
                return res.json({
                    data : grouparticle,
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
        // Validation
        req.checkBody('group_name' , ' گروه مقاله نمی تواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'group_name ');

        if(this.showValidationErrors(req, res))
            return;

        let newGroupArticle = new this.model.GroupArticle({
            group_name : req.body.group_name
        })
        newGroupArticle.save(err => {
            if(err) throw err;
            res.json('گروه مقاله با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.GroupArticle.findByIdAndUpdate(req.params.id , {
            group_name : req.body.group_name
        }, (err , grouparticle) => {
            if(err) throw err;

            if(grouparticle) {
                return res.json({
                    data : 'گروه مقاله با موفقیت آپدیت شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین گروه خبری وجود ندارد',
                success : false
            });
        });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.GroupArticle.findByIdAndRemove(req.params.id , (err , grouparticle) => {
            if(err) throw err;
            if(grouparticle) {
                return res.json({
                    data : 'گروه مقاله با موفقیت حذف شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین گروه مقاله ای وجود ندارد',
                success : false
            });
        });
    }

}