// Model
const User = require(`${config.path.model}/user`);
const News = require(`${config.path.model}/news`);
const GroupNews = require(`${config.path.model}/groupnews`);
const Article = require(`${config.path.model}/article`);
const Cooperator=require(`${config.path.model}/cooperator`);
const AdminUser=require(`${config.path.model}/admin_user`);
const Slider=require(`${config.path.model}/slider`);
const Role=require(`${config.path.model}/role`);
const GroupArticle=require(`${config.path.model}/grouparticle`);
const Product = require(`${config.path.model}/product`);
const Comment = require(`${config.path.model}/comment`);
const Answer = require(`${config.path.model}/answer`);
const ProjectUs = require(`${config.path.model}/projectus`);
const Video = require(`${config.path.model}/video`);

module.exports = class Controller {
    constructor() {
        this.model = { User,News,GroupNews,Article,Cooperator,AdminUser,Slider,Role,GroupArticle,
            Product , Comment , Answer,ProjectUs,Video}
    }
    showValidationErrors(req , res , callback) {
        let errors = req.validationErrors();
        if(errors) {
            res.status(422).json({
                message : errors.map(error => {
                    return {
                        'field' : error.param,
                        'message' : error.msg
                    }
                }),
                success : false
            });
            return true;
        }
        return false
    }

    escapeAndTrim(req , items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();            
        });
    }
}