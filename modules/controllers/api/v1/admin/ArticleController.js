const Controller = require(`${config.path.controller}/Controller`);
const ArticleTransform = require(`${config.path.transform}/v1/ArticleTransform`);

module.exports = new class ArticleController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.Article.paginate({} , { page , limit : 10,sort:{createdAt:'desc'}}).then(result => {
    //         if(result) {
    //             return res.json({
    //                 data : new ArticleTransform().withPaginate().transformCollection(result),
    //                 success : true
    //             });
    //         }
    //         res.json({
    //             message : 'مقاله ای وجود ندارد',
    //             success : false
    //         })
    //     })
    //         .catch(err => console.log(err));
    // }


    index(req , res) {
        this.model.Article.find({}).sort({title:-1}).exec((err , article) => {
            if(err) throw err;
            if(article) {
                return res.json ({
                    data: article,
                    success: true
                });
            }
            res.json({
                data : 'هیچ مقاله ای وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;

        this.model.Article.findById(req.params.id , (err , article) => {
            if(article) {
                return res.json({
                    data : article,
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
        req.checkBody('title' , ' عنوان مقاله نمی تواند خالی بماند').notEmpty();
        req.checkBody('abstract' , 'چکیده مقاله نمی تواند خالی بماند').notEmpty();
        req.checkBody('author' , 'نویسنده مقاله نمی تواند خالی بماند').notEmpty();
        req.checkBody('image' , 'تصویر مقاله نمی تواند خالی بماند').notEmpty();
        req.checkBody('detail' , 'متن مقاله نمی تواند خالی بماند').notEmpty();
        req.checkBody('date' , 'تاریخ مقاله نمی تواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'title abstract detail author');

        if(this.showValidationErrors(req, res))
            return;

        let newArticle = new this.model.Article({
            title : req.body.title,
            abstract : req.body.abstract,
            detail: req.body.detail,
            image : req.body.image,
            alt_img : req.body.alt_img,
            author:req.body.author,
            keyword:req.body.keyword,
            key_title:req.body.key_title,
            active:req.body.active,
            date:req.body.date,
        })

        newArticle.save(err => {
            if(err) throw err;
            res.json('مقاله با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Article.findByIdAndUpdate(req.params.id ,{ title : req.body.title,abstract : req.body.abstract,detail : req.body.detail,
            image : req.body.image,keyword : req.body.keyword,alt_img : req.body.alt_img,
            key_title : req.body.key_title,author : req.body.author,active : req.body.active,date:req.body.data}, (err , article) => {
            if(err) throw err;

            if(article) {
                return res.json({
                    data : ' مقاله با موفقیت آپدیت شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین مقاله ای وجود ندارد',
                success : false
            });
        });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Article.findByIdAndRemove(req.params.id , (err , article) => {
            if(err) throw err;
            if(article) {
                return res.json({
                    data : 'مقاله با موفقیت حذف شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین مقاله ای وجود ندارد',
                success : false
            });
        });
    }
}