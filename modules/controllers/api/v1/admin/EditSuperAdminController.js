const Controller = require(`${config.path.controller}/Controller`);
const bcrypt = require('bcrypt');

module.exports = new class EditSuperAdminController extends Controller {
    update(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        this.model.AdminUser.findOne({email: req.body.email}).exec((err, user) => {
            if (err) throw err;

                console.log(user)
                        // let hash = bcrypt.hashSync(req.body.newpassword, 10);
                        // this.model.AdminUser.findByIdAndUpdate(user.id,
                        //     {
                        //         email: req.body.newemail,
                        //         password: hash,
                        //     },
                        //     (err, answer) => {
                        //         res.json('ویرایش با موفقیت انجام شد');
                        //     });


            })
        }

}