const Controller = require(`${config.path.controller}/Controller`);
const NewsTransform = require(`${config.path.transform}/v1/NewsTransform`);

module.exports = new class NewsController extends Controller {
    index(req , res) {
        const page = req.query.page || 1;
        this.model.News.paginate({} , { page , limit : 10,sort:{createdAt:'desc'},select:'title abstract detail image group_name'}).then(result => {
            if(result) {
                return res.json({
                    data : new NewsTransform().withPaginate().transformCollection(result),
                    success : true
                });
            }

            res.json({
                message : 'خبری وجود ندارد',
                success : false
            })
        })
            .catch(err => console.log(err));
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.News.findById(req.params.id , (err , news) => {
            if(news) {
                return res.json({
                    data : news,
                    success : true
                })
            }
            res.json({
                data : 'چنین خبری وجود ندارد',
                success : false
            })
        })
    }

    store(req , res) {
        // Validation
        req.checkBody('title' , 'عنوان خبر نمی تواند خالی بماند').notEmpty();
        req.checkBody('abstract' , 'خلاصه خبر نمی تواند خالی بماند').notEmpty();
        req.checkBody('detail' , 'جزییات خبر نمی تواند خالی بماند').notEmpty();
        req.checkBody('image' , 'آدرس تصویر خبر نمی تواند خالی بماند').notEmpty();
        req.checkBody('group_name' , 'گروه خبر نمی تواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'title abstract detail group_name');
        // if(this.showValidationErrors(req, res))
        //     return;
        let newNews = new this.model.News({
            title : req.body.title,
            abstract : req.body.abstract,
            detail : req.body.detail,
            image : req.body.image,
            key_title : req.body.key_title,
            keyword : req.body.keyword,
            active : req.body.active,
            group_name:req.body.group_name
        })
        newNews.save(err => {
            if(err) throw err;
            res.json('خبر جدید با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.News.findByIdAndUpdate(req.params.id ,{ title : req.body.title,abstract : req.body.abstract,detail : req.body.detail,
                image : req.body.image,group_name : req.body.group_name,
            active : req.body.active,keyword : req.body.keyword,
            key_title : req.body.key_title}, (err , news) => {
            if(err) throw err;

            if(news) {
                return res.json({
                    data : ' خبر با موفقیت آپدیت شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین خبری وجود ندارد',
                success : false
            });
        });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.News.findByIdAndRemove(req.params.id , (err , news) => {
            if(err) throw err;
            if(news) {
                return res.json({
                    data : 'خبر با موفقیت حذف شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین خبری وجود ندارد',
                success : false
            });
        });
    }
}