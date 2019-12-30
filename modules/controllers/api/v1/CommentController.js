const Controller = require(`${config.path.controller}/Controller`);
const CommentTransform = require(`${config.path.transform}/v1/CommentTransform`);
module.exports = new class CommentController extends Controller {

    index(req , res) {

        const page = req.query.page || 1;
        this.model.Comment.paginate({active:true} , { page , limit : 10 })
            .then(result => {
                if(result) {
                    res.json({
                        data : new CommentTransform().withPaginate().transformCollection(result),
                        success : true
                    });
                }
            })
            .catch(err => console.log(err));
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

        this.escapeAndTrim(req , 'name comment property_id');

        if(this.showValidationErrors(req, res))
            return;

        let newComment = new this.model.Comment({
            product_Id :req.body.product_Id,
            name : req.body.name,
            comment : req.body.text,
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