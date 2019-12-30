const Transform = require('./../Transform');
module.exports = class ArticleTransform extends Transform {

    transform(item) {
        return {
            'title' : item.title,
            'abstract' : item.abstract,
            'detail' : item.detail,
            'image' : item.image,
            'alt_img' : item.alt_img,
            'author' : item.author,
            'keyword':item.keyword,
            'key_title':item.key_title,
            'active':item.active,
            '_id':item._id
        }
    }



}

