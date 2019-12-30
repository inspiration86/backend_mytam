const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);

module.exports = new class UserController extends Controller {
    index(req, res) {
        return res.json({
            data: new UserTransform().transform(req.user),
            success:true
        })
    }
}