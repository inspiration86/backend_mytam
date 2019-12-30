const Controller = require(`${config.path.controller}/Controller`);
const AdminUserTransform = require(`${config.path.transform}/v1/AdminUserTransform`);

module.exports = new class AdminUserController extends Controller {

    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.AdminUser.paginate({} , { page , limit : 10,sort:{createdAt:'desc'},select:'title abstract keyword author file image detail'}).then(result => {
    //         if(result) {
    //             return res.json({
    //                 data : new AdminUserTransform().withPaginate().transformCollection(result),
    //                 success : true
    //             });
    //         }
    //         res.json({
    //             message : ';کابر وجود ندارد',
    //             success : false
    //         })
    //     })
    //         .catch(err => console.log(err));
    // }

    index(req , res) {
        this.model.AdminUser.find({}).sort({createdAt:'desc'}).exec((err , adminuser) => {
            if(err) throw err;
            if(adminuser) {
                return res.json ({
                    data: adminuser,
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

        this.model.AdminUser.findById(req.params.id , (err , adminuser) => {
            if(adminuser) {
                return res.json({
                    data : adminuser,
                    success : true
                })
            }

            res.json({
                data : 'یافت نشد',
                success : false
            })
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        console.log(req.body.postalCode.length);
        this.model.AdminUser.findByIdAndUpdate(req.params.id ,{ name : req.body.name,mobail : req.body.mobail,tell : req.body.tell,
            postalCode : req.body.postalCode,adress : req.body.adress,city : req.body.city,country : req.body.country}, (err , adminuser) => {
            if(err) throw err;

            if(adminuser) {
                return res.json({
                    data : ' اطلاعات با موفقیت آپدیت شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین کابری وجود ندارد',
                success : false
            });
        });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.AdminUser.findByIdAndRemove(req.params.id , (err , adminuser) => {
            if(err) throw err;
            if(adminuser) {
                return res.json({
                    data : 'کاربر با موفقیت حذف شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین کاربری وجود ندارد',
                success : false
            });
        });
    }
}