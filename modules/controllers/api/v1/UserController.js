const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);

module.exports = new class UserController extends Controller {
    index(req , res) {
        this.model.User.find({}).sort({createdAt:'desc'}).exec((err , user) => {
            if(err) throw err;
            if(user) {
                return res.json ({
                    data: user,
                    success: true
                });
            }
            res.json({
                data : 'هیچ کاربری وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;

        this.model.User.findById(req.params.id , (err , user) => {
            if(user) {
                return res.json({
                    data : user,
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