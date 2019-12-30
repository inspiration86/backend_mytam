const Transform = require('./../Transform');

module.exports = class AnswerTransform extends Transform {

    transform(item) {

        return {
            'admin_user' : item.admin_user,
            'replay' : item.replay

        }
    }

}