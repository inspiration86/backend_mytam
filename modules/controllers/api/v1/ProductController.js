const Controller = require(`${config.path.controller}/Controller`);
const ProductTransform = require(`${config.path.transform}/v1/ProductTransform`);

module.exports = new class ProductController extends Controller {
    index(req , res) {
        const page = req.query.page || 1
        this.model.Product.paginate({active:true} , { page , limit : 10 , sort:{ createdAt:'desc' } })
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
}