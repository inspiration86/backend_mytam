const jwt = require('jsonwebtoken');
const AdminUser = require(`${config.path.model}/admin_user`);

module.exports = (req , res , next) =>  {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token) {
        return jwt.verify(token , config.secret , (err , decode ) => {
            if(err) {
                return res.json({
                    success : false ,
                    data : '\n' +'احراز هویت توکن انجام نشد.'
                })
            }
            AdminUser.findById(decode.user_id , (err , admin_user) => {
                if(err) throw err;

                if(admin_user) {
                    admin_user.token = token;
                    req.user = admin_user;
                    next();
                } else {
                    return res.json({
                        success : false ,
                        data : 'کاربر یافت نشد'
                    });
                }
            })

            // next();
            // return;
        })
    }

    return res.status(403).json({
        data : '\n' +'هیچ توکنی ارائه نشده است',
        success : false
    })
}