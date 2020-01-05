const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class VideoController extends Controller {
index(req , res) {
    this.model.Video.find({}).sort({title:-1}).exec((err , video) => {
        if(err) throw err;
        if(video) {
            return res.json ({
                data: video,
                success: true
            });
        }
        res.json({
            data : 'هیچ ویدیویی وجود ندارد',
            success : false
        })
    });
}

single(req, res) {
    req.checkParams('id' , 'آیدی وارد شده نامعتبر است').isMongoId();
    if(this.showValidationErrors(req, res))
        return;
    this.model.Video.findById(req.params.id , (err , video) => {
        if(video) {
            return res.json({
                data : video,
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