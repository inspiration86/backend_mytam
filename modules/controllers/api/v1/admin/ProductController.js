const Controller = require(`${config.path.controller}/Controller`);
const ProductTransform = require(`${config.path.transform}/v1/ProductTransform`);
module.exports = new class ProductController extends Controller {
    index(req , res) {
        const page = req.query.page || 1
        this.model.Product.paginate({} , { page , limit : 10 , sort:{ createdAt:'desc' } })
            .then(result => {
                if(result) {
                    return res.json({
                        data : new ProductTransform().withPaginate().transformCollection(result),
                        success : true
                    });
                }

                res.json({
                    message : 'محصولی وجود ندارد',
                    success : false
                })
            })

            .catch(err => console.log(err));
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
        // Validation
        req.checkBody('name' , 'نام محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('code' , 'کد محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('price' , 'قیمت محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('price_garranty' , 'قیمت گارانتی محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('stock' , ' موجودی محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('tag','برچسب محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('detail','توضیحات محصول نمیتواند خالی بماند').notEmpty();
        req.checkBody('key_word','کلید واژه نمیتواند خالی بماند ').notEmpty();
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
            stock:req.body.stock,
            tag:req.body.tag,
            detail:req.body.detail,
            key_word:req.body.key_word,
            description:req.body.description,
            image:req.body.image,
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
                stock:req.body.stock,
                tag:req.body.tag,
                detail:req.body.detail,
                key_word:req.body.key_word,
                description:req.body.description,
                image:req.body.image,
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