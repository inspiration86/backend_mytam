const Transform = require('./../Transform');

module.exports = class ProductTransform extends Transform {

    transform(item) {

        return {
            'name' : item.name,
            'code' : item.code,
            'price': item.price,
            'price_garranty':item.price_garranty,
            'use':item.use,
            'number':item.number,
            'detail':item.detail,
            'description':item.description,
            'image':item.image
        }
    }

}