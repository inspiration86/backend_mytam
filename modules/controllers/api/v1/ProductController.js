const Controller = require(`${config.path.controller}/Controller`);
const ProductTransform = require(`${config.path.transform}/v1/ProductTransform`);

module.exports = new class ProductController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1
    //     this.model.Product.paginate({active:true} , { page , limit : 10 , sort:{ createdAt:'desc' } })
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
        this.model.Product.find({active:true}).sort({name:-1}).exec((err , product) => {
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
        this.model.Product.findById(req.params.id, (err , product) => {
            if(product){
               if (product.active===true) {
                return res.json({
                    data : product,
                    success : true
                })
           }
            }
            res.json({
                data : 'محصول یافت نشد',
                success : false
            })
        })
    }

}