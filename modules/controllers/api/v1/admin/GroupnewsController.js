const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class GroupNewsController extends Controller {
    index(req , res) {
        this.model.GroupNews.find({}).sort({group_name:-1}).exec((err , groupnews) => {
            if(err) throw err;
            if(groupnews) {
                return res.json ({
                    data: groupnews,
                    success: true
                });
            }
            res.json({
                data : 'هیچ گروه خبری وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'آیدی وارد شده نامعتبر است').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
            this.model.GroupNews.findById(req.params.id , (err , groupnews) => {
            if(groupnews) {
                return res.json({
                    data : groupnews,
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
        req.checkBody('group_name' , ' گروه خبری نمی تواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'group_name ');

        if(this.showValidationErrors(req, res))
            return;

        let newGroupNews = new this.model.GroupNews({
            group_name : req.body.group_name
        })
        newGroupNews.save(err => {
            if(err) throw err;
            res.json('گروه خبری با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.GroupNews.findByIdAndUpdate(req.params.id , {
            group_name : req.body.group_name
        }, (err , groupnews) => {
            if(err) throw err;

            if(groupnews) {
                return res.json({
                    data : 'گروه خبری با موفقیت آپدیت شد',
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
        this.model.GroupNews.findByIdAndRemove(req.params.id , (err , groupnews) => {
            if(err) throw err;
            if(groupnews) {
                return res.json({
                    data : 'گروه خبری با موفقیت حذف شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین گروه خبری وجود ندارد',
                success : false
            });
        });
    }

}