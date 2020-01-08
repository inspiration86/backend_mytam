const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class BuyController extends Controller {

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Buy.findById(req.params.id , (err , buy) => {
            if(buy) {
                return res.json({
                    data : buy,
                    success : true
                })
            }
            res.json({
                data : 'سفارش یافت نشد',
                success : false
            })
        })
    }

    store(req , res) {
        req.checkBody('product_id' , ' فیلد شناسه محصول نمی تواند خالی بماند').notEmpty();
        req.checkBody('user_id' , 'فیلد شناسه کاربر نمی تواند خالی بماند').notEmpty();
        req.checkBody('number' , 'فیلد تعداد نمی تواند خالی بماند').notEmpty();
        req.checkBody('date' , 'فیلد تاریخ  نمی تواند خالی بماند').notEmpty();
        req.checkBody('time' , 'فیلد زمان  نمی تواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'product_id user_id number');
        if(this.showValidationErrors(req, res))
            return;
        let newBuy = new this.model.Buy({
            product_Id : req.body.product_Id,
            user_id : req.body.user_id,
            number: req.body.number,
            offer:req.body.offer,
            offer_code:req.body.offer_code,
            warranty:req.body.warranty,
            date:req.body.date,
            time:req.body.time,
        })
        newBuy.save(err => {
            if(err) throw err;
            res.json('سفارش با موفقیت ثبت شد');
        })

        if (req.body.offer!=='') {
           this.model.Offer.findOne({offer_code:req.body.offer_code} ,{
               remain_number:(remain_number-req.body.number)
            }, (err , buy) => {
                if(err) throw err;
                if(buy) {
                    return res.json({
                        data : '  وضعیت سفارش با موفقیت آپدیت شد',
                        success : true
                    });
                }
                res.status(404).json({
                    data : 'چنین سفارشی وجود ندارد',
                    success : false
                });
            });
        }
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Buy.findByIdAndRemove(req.params.id , (err , buy) => {
            if(err) throw err;
            if(buy) {
                return res.json({
                    data : 'سفارش  با موفقیت حذف شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین سفارشی وجود ندارد',
                success : false
            });
        });
    }
}