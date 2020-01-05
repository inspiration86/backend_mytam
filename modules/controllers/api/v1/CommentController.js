const Controller = require(`${config.path.controller}/Controller`);
const CommentTransform = require(`${config.path.transform}/v1/CommentTransform`);
module.exports = new class CommentController extends Controller {

    index(req , res) {
        this.model.Comment.find({}).sort({name:-1}).exec((err , comment) => {
            if(err) throw err;
            if(comment) {
                return res.json ({
                    data: comment,
                    success: true
                });
            }
            res.json({
                data : 'هیچ نظری وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'آی دی وارد شده صحیح نمی باشد').isMongoId();

        if(this.showValidationErrors(req, res))
            return;

        this.model.Comment.findById(req.params.id , (err , comment) => {
            if(comment) {
                return res.json({
                    data : new CommentTransform().transformCollection(comment),
                    success : true
                })
            }
            res.json({
                data : 'یافت نشد',
                success : false
            })
        })
    }

    store(req , res) {
        req.checkBody('name' , 'فیلد نام نمی تواند خالی بماند').notEmpty();
        req.checkBody('comment' , 'فیلد نظر نمی تواند خالی بماند').notEmpty();
        req.checkBody('property_id' ,' شناسه محصول نمی تواند خالی بماند').notEmpty();
        req.checkBody('date' ,' تاریخ  نمی تواند خالی بماند').notEmpty();
        req.checkBody('time' ,' تاریخ  نمی تواند خالی بماند').notEmpty();
        this.escapeAndTrim(req , 'name comment property_id');
        if(this.showValidationErrors(req, res))
            return;
        let newComment = new this.model.Comment({
            product_Id :req.body.product_Id,
            name : req.body.name,
            comment : req.body.text,
            date:req.body.date,
            time:req.body.time
        });
        newComment.save(err => {
            if(err) throw err;
            res.json({
                data : 'نظر شما با موفقیت ثبت شد',
                success : true
            })
        })
    }
}