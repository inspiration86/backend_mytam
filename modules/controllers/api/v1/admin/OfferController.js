const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class OfferController extends Controller {
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
        req.checkBody('title' , ' عنوان نمیتواند خالی بماند').notEmpty();
        req.checkBody('product_Id' , 'شناسه محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('offer_type' , 'نوع تخفیف  نمیتواند خالی بماند').notEmpty();
        req.checkBody('start_date' , 'تاریخ آغاز تخفیف نمیتواند خالی بماند').notEmpty();
        req.checkBody('end_date' , 'تاریخ پایان تخفیف نمیتواند خالی بماند').notEmpty();
        req.checkBody('percent_offer' , 'درصد تخفیف نمیتواند خالی بماند').notEmpty();
        req.checkBody('max_number' , 'تعداد تخفیف نمیتواند خالی بماند').notEmpty();
        req.checkBody('remain_number' , 'تعداد تخفیف باقی مانده نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req , 'title product_Id offer_type max_number remain_number');
        if(this.showValidationErrors(req, res))
            return;
        let newOffer = new this.model.Offer({
            product_Id : req.body.product_Id,
            title : req.body.title,
            offer_type : req.body.offer_type,
            start_date : req.body.start_date,
            end_date : req.body.end_date,
            percent_offer :req.body.percent_offer,
            max_number :req.body.max_number,
            remain_number : req.body.remain_number,
            active :req.body.active,
        })
        newOffer.save(err => {
            if(err) throw err;
            res.json('تخفیف با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Offer.findByIdAndUpdate(req.params.id ,
            {
                product_Id : req.body.product_Id,
                title : req.body.title,
                offer_type : req.body.offer_type,
                start_date : req.body.start_date,
                end_date : req.body.end_date,
                percent_offer :req.body.percent_offer,
                max_count :req.body.max_count,
                remain_count : req.body.remain_count,
                active :req.body.active,
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