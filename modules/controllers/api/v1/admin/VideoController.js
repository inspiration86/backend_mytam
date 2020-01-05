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

    store(req , res) {
        req.checkBody('title' , ' عنوان ویدیو نمی تواند خالی بماند').notEmpty();
        req.checkBody('video' , ' ویدیو نمی تواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'title');
        if(this.showValidationErrors(req, res))
            return;
        let newVideo = new this.model.Video({
            title : req.body.title,
            video : req.body.video,
            keyword : req.body.keyword

        })
        newVideo.save(err => {
            if(err) throw err;
            res.json('ویدیو با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Video.findByIdAndUpdate(req.params.id , {
            title : req.body.title,
            video : req.body.video,
            keyword:req.body.keyword
        }, (err , video) => {
            if(err) throw err;
            if(video) {
                return res.json({
                    data : 'ویدیو با موفقیت آپدیت شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین ویدیویی وجود ندارد',
                success : false
            });
        });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Video.findByIdAndRemove(req.params.id , (err , video) => {
            if(err) throw err;
            if(video) {
                return res.json({
                    data : 'ویدیو با موفقیت حذف شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین ویدیویی وجود ندارد',
                success : false
            });
        });
    }

}