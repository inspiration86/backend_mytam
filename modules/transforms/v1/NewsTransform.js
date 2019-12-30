const Transform = require('./../Transform');
module.exports = class NewsTransform extends Transform {

    transform(item) {
        return {
            'title' : item.title,
            'abstract' : item.abstract,
            'detail' : item.detail,
            'image' : item.image,
            'group_name' : item.group_name,
            "_id":item._id

        }
    }

}

