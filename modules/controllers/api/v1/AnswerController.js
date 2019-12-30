const Controller = require(`${config.path.controller}/Controller`);
const AnswerTransform = require(`${config.path.transform}/v1/AnswerTransform`);

module.exports = new class AnswerController extends Controller {
    index(req, res) {

        const page = req.query.page || 1
        this.model.Answer.paginate({}, { page, limit: 10, sort: { replay: -1 }, populate : ['user']  })
            .then(result => {
                if (result) {
                    return res.json({
                        data: new AnswerTransform().withPaginate().transformCollection(result),
                        success: true
                    });
                }
                res.json({
                    message: 'پاسخی وجود ندارد',
                    success: false
                })
            })

            .catch(err => console.log(err));
    }

}