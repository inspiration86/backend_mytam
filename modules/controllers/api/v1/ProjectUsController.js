const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ProjectUsController extends Controller {
    index(req , res) {
        this.model.ProjectUs.find({}).sort({title:-1}).exec((err , projectus) => {
            if(err) throw err;
            if(projectus) {
                return res.json ({
                    data: projectus,
                    success: true
                });
            }
            res.json({
                data : 'هیچ اطلاعاتی وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'آیدی وارد شده نامعتبر است').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.ProjectUs.findById(req.params.id , (err , projectus) => {
            if(projectus) {
                return res.json({
                    data : projectus,
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