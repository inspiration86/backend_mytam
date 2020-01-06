const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class BuyController extends Controller {
    index(req , res) {
        this.model.Buy.find({}).sort({number:-1}).exec((err , buy) => {
            if(err) throw err;
            if(buy) {
                return res.json ({
                    data: buy,
                    success: true
                });
            }
            res.json({
                data : 'هیچ سفارشی وجود ندارد',
                success : false
            })
        });
    }

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
                data : 'چنین سفارشی یافت نشد',
                success : false
            })
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Buy.findByIdAndUpdate(req.params.id ,{
            status:req.body.status
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

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Buy.findByIdAndRemove(req.params.id , (err , buy) => {
            if(err) throw err;
            if(buy) {
                return res.json({
                    data : 'سفارش با موفقیت حذف شد',
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