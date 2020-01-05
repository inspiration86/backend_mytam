const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class CooperatorController extends Controller {
    index(req, res) {
        this.model.Cooperator.find({}).sort({name: -1}).exec((err, cooperator) => {
            if (err) throw err;
            if (cooperator) {
                return res.json({
                    data: cooperator,
                    success: true
                })

            }
            res.json({
                data: 'یافت نشد',
                success: false
            });

        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Cooperator.findById(req.params.id, (err, cooperator) => {
            if (cooperator) {
                return res.json({
                    data: cooperator,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }
}