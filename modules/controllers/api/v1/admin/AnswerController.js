const Controller = require(`${config.path.controller}/Controller`);
const AnswerTransform = require(`${config.path.transform}/v1/AnswerTransform`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
module.exports = new class AnswerController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1
    //     this.model.Answer.paginate({} , { page , limit : 10, sort:{ createdAt:'desc' } , populate : ['user'] })
    //         .then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new AnswerTransform().withPaginate().transformCollection(result),
    //                     success : true
    //                 });
    //             }
    //
    //             res.json({
    //                 message : 'اطلاعاتی وجود ندارد',
    //                 success : false
    //             })
    //         })
    //
    //         .catch(err => console.log(err));
    //
    // }
    index(req , res) {
        this.model.Answer.find({}).sort({replay:-1}).exec((err , answer) => {
            if(err) throw err;
            if(answer) {
                return res.json ({
                    data: answer,
                    success: true
                });
            }
            res.json({
                data : 'هیچ پاسخی وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;

        this.model.Answer.findById(req.params.id , (err , answer) => {
            if(answer) {
                return res.json({
                    data : answer,
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
        req.checkBody('admin_user' , ' کاربر نمیتواند خالی بماند').notEmpty();
        req.checkBody('replay' , 'پاسخ محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('comment_Id' , 'آیدی کامنت نمیتواند خالی بماند').notEmpty();
        req.checkBody('date' , 'تاریخ کامنت نمیتواند خالی بماند').notEmpty();
        req.checkBody('time' , 'زمان کامنت نمیتواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'admin_user replay');

        if(this.showValidationErrors(req, res))
            return;

        let newAnswer = new this.model.Answer({
            admin_user : req.body.admin_user,
            replay: req.body.replay,
            date:req.body.date,
            comment_Id: req.body.comment_Id,
            time:req.body.time
        })
        newAnswer.save(err => {
            if(err) throw err;
            res.json('پاسخ با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Answer.findByIdAndUpdate(req.params.id ,
            {
                admin_user : req.body.admin_user,
                replay:req.body.replay,
                date:req.body.date,
                comment_Id:req.body.comment_Id,
                time:req.body.time
            },
            (err , answer) => {
                res.json('ویرایش با موفقیت انجام شد');
            });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();

        if(this.showValidationErrors(req, res))
            return;

        this.model.Answer.findByIdAndRemove(req.params.id , (err , answer) => {
            if(err) throw err;
            res.json('اطلاعات با موفقیت حذف شد');
        })
    }
}