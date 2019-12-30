module.exports = (req , res , next) =>  {
    if(req.AdminUser.type == 'admin') {
        next();
        return res.status(200).json({
            type:'admin',
            success : true
        });
    }
    return res.status(403).json({
        message : 'You cannot access this root',
        success : false
    })
}