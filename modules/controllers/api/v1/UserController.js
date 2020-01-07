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

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.User.findByIdAndUpdate(req.params.id ,{
            name : req.body.name,
            profile:req.body.profile ,
            mobail :req.body.mobail,
            tell : req.body.tell ,
            postalCode :req.body.postalCode,
            address :req.body.address,
            city: req.body.city,
            province: req.body.province,
            country:req.body.country
        }, (err , user) => {
            if(err) throw err;
            if(user) {
                return res.json({
                    data : ' اطلاعات کاربر با موفقیت ثبت شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین کابری وجود ندارد',
                success : false
            });
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