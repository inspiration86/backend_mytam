const Controller = require(`${config.path.controller}/Controller`);
const NewsTransform = require(`${config.path.transform}/v1/NewsTransform`);
module.exports = new class NewsController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.News.paginate({active:true} , { page , limit : 10,sort:{createdAt:'desc'},select:'title abstract detail image group_name'}).then(result => {
    //         if(result) {
    //             return res.json({
    //                 data : new NewsTransform().withPaginate().transformCollection(result),
    //                 success : true
    //             });
    //         }
    //         res.json({
    //             message : 'خبری وجود ندارد',
    //             success : false
    //         })
    //     })
    //         .catch(err => console.log(err));
    // }

    index(req , res) {
        this.model.News.find({active:true}).sort({title:-1}).exec((err , news) => {
            if(err) throw err;
            if(news) {
                return res.json ({
                    data: news,
                    success: true
                });
            }
            res.json({
                data : 'هیچ خبری وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.News.findById(req.params.id , (err , news) => {
            if(news) {
                if (news.active===true) {
                return res.json({
                    data : news,
                    success : true
                })
            }
            }
            res.json({
                data : 'خبر یافت نشد',
                success : false
            })
        })
    }

}

