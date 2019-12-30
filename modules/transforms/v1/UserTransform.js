const Transform = require('./../Transform');
const jwt = require('jsonwebtoken');

module.exports = class UserTransform extends Transform {

    transform(item , createToken = false) {
        this.createToken = createToken;
        return {
            '_id' : item._id,
            'email' : item.email,
            'user_type' :item.user_type,
            ...this.withToken(item)
        }
    }

    withToken(item) {
        if(item.token) 
            return { token : item.token}

        if(this.createToken) {
         
            let token = jwt.sign({ user_id : item._id } , config.secret , {
                expiresIn :  '110h',
            });

            return { token }
        }

        return {};
    }

}