const Controller = require(`${config.path.controller}/Controller`);
const ProductTransform = require(`${config.path.transform}/v1/ProductTransform`);
module.exports = new class ProductController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1
    //     this.model.Product.paginate({} , { page , limit : 10 , sort:{ createdAt:'desc' } })
    //         .then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new ProductTransform().withPaginate().transformCollection(result),
    //                     success : true
    //                 });
    //             }
    //
    //             res.json({
    //                 message : 'محصولی وجود ندارد',
    //                 success : false
    //             })
    //         })
    //
    //         .catch(err => console.log(err));
    // }
    index(req , res) {
        this.model.Product.find({}).sort({name:-1}).exec((err , product) => {
            if(err) throw err;
            if(product) {
                return res.json ({
                    data: product,
                    success: true
                });
            }
            res.json({
                data : 'هیچ محصولی وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;

        this.model.Product.findById(req.params.id , (err , product) => {
            if(product) {
                return res.json({
                    data : product,
                    success : true
                })
            }

            res.json({
                data : 'محصول مورد نظر یافت نشد',
                success : false
            })
        })
    }

    store(req , res) {
        req.checkBody('name' , 'نام محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('code' , 'کد محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('price' , 'قیمت محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('number' , ' تعداد موجودی محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('use','کاربرد محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('description' , ' شرح محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('image' , ' لطفا تصویر را درج کنید').notEmpty();

       this.escapeAndTrim(req , 'name code price price_garranty stock tag detail key_word description');

        if(this.showValidationErrors(req, res))
            return;

        let newProduct = new this.model.Product({
            name : req.body.name,
            code : req.body.code,
            price: req.body.price,
            price_garranty : req.body.price_garranty,
            use:req.body.use,
            number:req.body.number,
            keyword:req.body.keyword,
            description:req.body.description,
            image:req.body.image,
            alt_img:req.body.alt_img,
            exist:req.body.exist,
            active:req.body.active
        })
        newProduct.save(err => {
            if(err) throw err;
            res.json('محصول با موفقیت ثبت شد');
        })
    }

    update(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Product.findByIdAndUpdate(req.params.id ,
            {  name : req.body.name,
                code : req.body.code,
                price: req.body.price,
                price_garranty : req.body.price_garranty,
                use:req.body.use,
                number:req.body.number,
                detail:req.body.detail,
                keyword:req.body.keyword,
                description:req.body.description,
                image:req.body.image,
                alt_img:req.body.alt_img,
                exist:req.body.exist,
                active:req.body.active
            },
            (err , product) => {
                if(err) throw err;
                if(product) {
                    return res.json({
                        data : ' ویرایش محصول با موفقیت انجام شد',
                        success : true
                    });
                }
                res.status(404).json({
                    data : 'چنین محصولی وجود ندارد',
                    success : false
                });
            });
    }

    destroy(req ,res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();

        if(this.showValidationErrors(req, res))
            return;
        this.model.Product.findByIdAndRemove(req.params.id , (err , product) => {
            if(err) throw err;
            if(product) {
                return res.json({
                    data : 'محصول با موفقیت حذف شد',
                    success : true
                });
            }
            res.status(404).json({
                data : 'چنین محصولی وجود ندارد',
                success : false
            });
        })
    }
}