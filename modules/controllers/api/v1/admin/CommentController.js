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
                data : 'هیچ گروه نظری وجود ندارد',
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
                    data : comment,
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

    update(req ,res) {
        req.checkParams('id' , 'آی دی وارد شده صحیح نمی باشد').isMongoId();

        if(this.showValidationErrors(req, res))
            return;

        this.model.Comment.findByIdAndUpdate(req.params.id ,
            {active :true}, (err , comment) => {
            if(err) throw err;
            if(comment) {
                return res.json({
                    data : 'نظر با موفقیت تایید شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'یافت نشد',
                success : false
            });
        });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Comment.findByIdAndRemove(req.params.id , (err , comment) => {
            if(err) throw err;
            if(comment) {
                return res.json({
                    data : 'نظر با موفقیت حذف شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین نظری وجود ندارد',
                success : false
            });
        });
    }


}