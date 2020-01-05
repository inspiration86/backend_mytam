const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class AnswerController extends Controller {
    index(req , res) {
        this.model.Offer.find({}).sort({title:-1}).exec((err , offer) => {
            if(err) throw err;
            if(offer) {
                return res.json ({
                    data: offer,
                    success: true
                });
            }
            res.json({
                data : 'هیچ تخفیفی وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Offer.findById(req.params.id , (err , offer) => {
            if(offer) {
                return res.json({
                    data : offer,
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
        req.checkBody('name' , ' کاربر نمیتواند خالی بماند').notEmpty();
        req.checkBody('replay' , 'پاسخ محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('comment_Id' , 'آیدی کامنت نمیتواند خالی بماند').notEmpty();
        req.checkBody('date' , 'تاریخ کامنت نمیتواند خالی بماند').notEmpty();
        req.checkBody('time' , 'زمان کامنت نمیتواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'name replay');
        if(this.showValidationErrors(req, res))
            return;
        let newOffer = new this.model.Offer({
            name : req.body.name,
            replay: req.body.replay,
            date:req.body.date,
            comment_Id: req.body.comment_Id,
            time:req.body.time
        })
        newOffer.save(err => {
            if(err) throw err;
            res.json('پاسخ با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Offer.findByIdAndUpdate(req.params.id ,
            {
                product_Id : req.body.product_Id,
                title:req.body.title,
                offer_type:req.body.offer_type,
                offer_type:req.body.offer_type,
                start_date:req.body.start_date,
                end_date:req.body.end_date,
                percent_offer:req.body.percent_offer,
                max_count:req.body.max_count,
                active:req.body.active
            },
            (err , offer) => {
                res.json('ویرایش با موفقیت انجام شد');
            });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Offer.findByIdAndRemove(req.params.id , (err , offer) => {
            if(err) throw err;
            res.json('اطلاعات با موفقیت حذف شد');
        })
    }
}