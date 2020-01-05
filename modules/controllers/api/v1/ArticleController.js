const Controller = require(`${config.path.controller}/Controller`);
const ArticleTransform = require(`${config.path.transform}/v1/ArticleTransform`);

module.exports = new class ArticleController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.Article.paginate({active:true} , { page , limit : 10,sort:{createdAt:'desc'},select:'title abstract author image detail'}).then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new ArticleTransform().withPaginate().transformCollection(result),
    //                     success : true
    //                 });
    //             }
    //
    //             res.json({
    //                 message : 'مقاله ای وجود ندارد',
    //                 success : false
    //             })
    //         })
    //         .catch(err => console.log(err));
    // }

    index(req , res) {
        this.model.Article.find({active:true}).sort({title:-1}).exec((err , article) => {
            if(err) throw err;
            if(article) {
                return res.json ({
                    data: article,
                    success: true
                });
            }
            res.json({
                data : 'هیچ مقاله ای وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Article.findById(req.params.id , (err , article) => {
            if(article){
                if (article.active===true){
                return res.json({
                    data : article,
                    success : true
                })
            }
            }
            res.json({
                data : 'مقاله یافت نشد',
                success : false
            })
        })
    }

}