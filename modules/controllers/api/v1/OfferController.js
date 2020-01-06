const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class AnswerController extends Controller {
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
}