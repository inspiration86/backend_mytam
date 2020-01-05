const Controller = require(`${config.path.controller}/Controller`);
const AnswerTransform = require(`${config.path.transform}/v1/AnswerTransform`);

module.exports = new class AnswerController extends Controller {
    index(req , res) {
        this.model.Answer.find({}).sort({replay:-1}).exec((err , answer) => {
            if(err) throw err;
            if(answer) {
                return res.json ({
                    data: answer,
                    success: true
                });
            }
            res.json({
                data : 'هیچ پاسخی وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Answer.findById(req.params.id , (err , answer) => {
            if(answer) {
                return res.json({
                    data : answer,
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