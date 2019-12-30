const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class SliderController extends Controller {
    index(req , res) {
        this.model.Slider.find({}).sort({group_name:-1}).exec((err , slider) => {
            if(err) throw err;
            if(slider) {
                return res.json ({
                    data: slider,
                    success: true
                });
            }
            res.json({
                data : 'هیچ اسلایدی وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;

        this.model.Slider.findById(req.params.id , (err , slider) => {
            if(slider) {
                return res.json({
                    data : slider,
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
        req.checkBody('image' , ' تصویر نمی تواند خالی بماند').notEmpty();
        req.checkBody('title' , 'عنوان نمی تواند خالی بماند').notEmpty();
        req.checkBody('text' , 'متن نمی تواند خالی بماند').notEmpty();
        // req.checkBody('link' , 'لینک نمی تواند خالی بماند').notEmpty();
        // req.checkBody('keyword' , 'کلیدواژه نمی تواند خالی بماند').notEmpty();

        this.escapeAndTrim(req , 'title text');

        if(this.showValidationErrors(req, res))
            return;

        let newSlider = new this.model.Slider({
            title : req.body.title,
            image : req.body.image,
            text:req.body.text,
            keyword:req.body.keyword
        })
        newSlider.save(err => {
            if(err) throw err;
            res.json('اسلاید با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Slider.findByIdAndUpdate(req.params.id ,{ title : req.body.title,
            text : req.body.text,image : req.body.image,link : req.body.link,
            keyword : req.body.keyword}, (err , slider) => {
            if(err) throw err;

            if(slider) {
                return res.json({
                    data : ' اسلاید با موفقیت آپدیت شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین اسلایدی وجود ندارد',
                success : false
            });
        });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Slider.findByIdAndRemove(req.params.id , (err , slider) => {
            if(err) throw err;
            if(slider) {
                return res.json({
                    data : 'اسلاید با موفقیت حذف شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین اسلایدی وجود ندارد',
                success : false
            });
        });
    }
}