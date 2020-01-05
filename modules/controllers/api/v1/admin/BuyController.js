const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class BuyController extends Controller {
    index(req , res) {
        this.model.Buy.find({}).sort({title:-1}).exec((err , buy) => {
            if(err) throw err;
            if(buy) {
                return res.json ({
                    data: buy,
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
        this.model.Article.findById(req.params.id , (err , buy) => {
            if(buy) {
                return res.json({
                    data : buy,
                    success : true
                })
            }
            res.json({
                data : 'مقاله یافت نشد',
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
        req.checkBody('time' , 'تاریخ مقاله نمی تواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'title abstract detail author');
        if(this.showValidationErrors(req, res))
            return;
        let newBuy = new this.model.Article({
            //soal age chand mahsol
            product_Id : req.body.product_Id,
            user_id : req.body.user_id,
            number: req.body.number,

        })
        newBuy.save(err => {
            if(err) throw err;
            res.json('مقاله با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Buy.findByIdAndUpdate(req.params.id ,{
            title : req.body.title,
            abstract : req.body.abstract,
            detail : req.body.detail,
            image : req.body.image,
            keyword : req.body.keyword,
            alt_img : req.body.alt_img,
            key_title : req.body.key_title,
            author : req.body.author,
            active : req.body.active,
            date:req.body.data,
            time:req.body.time
        }, (err , article) => {
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
        this.model.Buy.findByIdAndRemove(req.params.id , (err , article) => {
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