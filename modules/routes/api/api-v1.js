const express = require('express');
const router = express.Router();
const adminRouter = express.Router();
const employeeRouter = express.Router();
/*
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
//rate limiting
const apiLimiter  = RateLimit({
    max: 2,// max requests
    windowMs: 15 * 60 * 1000, // 15min
    message: 'درخواست ها بیش از حد مجاز' // message to send
});
*/
// middlewares 
const apiAuth = require('./middleware/apiAuth');
const apiAuthAdmin = require('./middleware/apiAuthAdmin');
const apiAdmin = require('./middleware/apiAdmin');

const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadVideo } = require('./middleware/UploadMiddleware');

// Controllers 
const { api : ControllerApi } = config.path.controllers;
const HomeController = require(`${ControllerApi}/v1/HomeController`);
const AuthController = require(`${ControllerApi}/v1/AuthController`);
const ResetPasswordController = require(`${ControllerApi}/v1/ResetPasswordController`);
const UserController = require(`${ControllerApi}/v1/UserController`);
const ArticleController = require(`${ControllerApi}/v1/ArticleController`);
const NewsController = require(`${ControllerApi}/v1/NewsController`);
const CommentController = require(`${ControllerApi}/v1/CommentController`);
const CooperatorController = require(`${ControllerApi}/v1/CooperatorController`);

// AdminController
const AdminAuthController = require(`${ControllerApi}/v1/admin/AdminAuthController`);
const AdminUserController = require(`${ControllerApi}/v1/admin/AdminUserController`);
const AdminUserUserController = require(`${ControllerApi}/v1/admin/UserController`);
const AdminUploadController = require(`${ControllerApi}/v1/admin/UploadController`);
const AdminRoleController = require(`${ControllerApi}/v1/admin/RoleController`);
const AdminSliderController = require(`${ControllerApi}/v1/admin/SliderController`);
const AdminVideoController = require(`${ControllerApi}/v1/admin/VideoController`);
const AdminNewsController = require(`${ControllerApi}/v1/admin/NewsController`);
const AdminGroupNewsController = require(`${ControllerApi}/v1/admin/GroupnewsController`);
const AdminArticleController = require(`${ControllerApi}/v1/admin/ArticleController`);
const AdminUserTypeController = require(`${ControllerApi}/v1/admin/UserTypeController`);
const AdminCommentController = require(`${ControllerApi}/v1/admin/CommentController`);
const AdminCooperatorController = require(`${ControllerApi}/v1/admin/CooperatorController`);
const AdminProjectUsController = require(`${ControllerApi}/v1/admin/ProjectUsController`);
const AdminProductController = require(`${ControllerApi}/v1/admin/ProductController`);

//user router
router.get('/' , HomeController.index);
router.get('/version' , HomeController.version);
router.post('/resetpassword' , ResetPasswordController.resetpassword.bind(ResetPasswordController));
router.post('/login' , AuthController.login.bind(AuthController));
router.post('/register' , AuthController.register.bind(AuthController));
//router.get('/user' , apiAuth , UserController.index.bind(UserController));
router.get('/cooperator' , CooperatorController.index.bind(CooperatorController));
router.get('/cooperator/:id' , CooperatorController.index.bind(CooperatorController));
router.get('/article/:id' , ArticleController.single.bind(ArticleController));
router.get('/article' , ArticleController.index.bind(ArticleController));
router.get('/news' , NewsController.index.bind(NewsController));
router.get('/news/:id' , NewsController.single.bind(NewsController));
router.post('/comment' , CommentController.store.bind(CommentController));


//admin router
//upload
adminRouter.post('/image' , uploadImage.single('image') , AdminUploadController.uploadImage.bind(AdminUploadController));
adminRouter.post('/video' , uploadVideo.single('video') , AdminUploadController.uploadVideo.bind(AdminUploadController));

//user
adminRouter.get('/user' , AdminUserUserController.index.bind(AdminUserUserController));
adminRouter.get('/user/:id' , AdminUserUserController.single.bind(AdminUserUserController));
//adminRouter.post('/user' , AdminUserUserController.store.bind(AdminUserUserController));
adminRouter.delete('/user/:id' , AdminUserUserController.destroy.bind(AdminUserUserController));
adminRouter.put('/user/:id' , AdminUserUserController.update.bind(AdminUserUserController));


//role
adminRouter.get('/role' , AdminRoleController.index.bind(AdminRoleController));
adminRouter.get('/role/:id' , AdminRoleController.single.bind(AdminRoleController));
adminRouter.post('/role' , AdminRoleController.store.bind(AdminRoleController));
adminRouter.delete('/role/:id' , AdminRoleController.destroy.bind(AdminRoleController));
adminRouter.put('/role/:id' , AdminRoleController.update.bind(AdminRoleController));

//projectus
adminRouter.get('/projectus' , AdminProjectUsController.index.bind(AdminProjectUsController));
adminRouter.get('/projectus/:id' , AdminProjectUsController.single.bind(AdminProjectUsController));
adminRouter.post('/projectus' , AdminProjectUsController.store.bind(AdminProjectUsController));
adminRouter.delete('/projectus/:id' , AdminProjectUsController.destroy.bind(AdminProjectUsController));
adminRouter.put('/projectus/:id' , AdminProjectUsController.update.bind(AdminProjectUsController));

//slider
adminRouter.get('/slider' , AdminSliderController.index.bind(AdminSliderController));
adminRouter.get('/slider/:id' , AdminSliderController.single.bind(AdminSliderController));
adminRouter.post('/slider' , AdminSliderController.store.bind(AdminSliderController));
adminRouter.delete('/slider/:id' , AdminSliderController.destroy.bind(AdminSliderController));
adminRouter.put('/slider/:id' , AdminSliderController.update.bind(AdminSliderController));

//video
adminRouter.get('/video' , AdminVideoController.index.bind(AdminVideoController));
adminRouter.get('/video/:id' , AdminVideoController.single.bind(AdminVideoController));
adminRouter.post('/video' , AdminVideoController.store.bind(AdminVideoController));
adminRouter.put('/video/:id' , AdminVideoController.update.bind(AdminVideoController));
adminRouter.delete('/video/:id' , AdminVideoController.destroy.bind(AdminVideoController));

//admin user
adminRouter.get('/adminuser' , AdminUserController.index.bind(AdminUserController));
adminRouter.get('/adminuser/:id' , AdminUserController.single.bind(AdminUserController));
adminRouter.delete('/adminuser/:id' , AdminUserController.destroy.bind(AdminUserController));
adminRouter.put('/adminuser/:id' , AdminUserController.update.bind(AdminUserController));
// admin auth
adminRouter.post('/register' , AdminAuthController.register.bind(AdminAuthController));
adminRouter.post('/login', AdminAuthController.login.bind(AdminAuthController));

//comment
adminRouter.get('/comment', AdminCommentController.index.bind(AdminCommentController));
adminRouter.get('/comment/:id' , AdminCommentController.single.bind(AdminCommentController));
adminRouter.post('/comment' , AdminCommentController.store.bind(AdminCommentController));
adminRouter.put('/comment/:id' , AdminCommentController.update.bind(AdminCommentController));
adminRouter.delete('/comment/:id' , AdminCommentController.destroy.bind(AdminCommentController));

//user type
adminRouter.get('/user_type' , AdminUserTypeController.index.bind(AdminUserTypeController));
adminRouter.get('/user_type/:id' , AdminUserTypeController.single.bind(AdminUserTypeController));
adminRouter.post('/user_type' , AdminUserTypeController.store.bind(AdminUserTypeController));
adminRouter.put('/user_type/:id' , AdminUserTypeController.update.bind(AdminUserTypeController));
adminRouter.delete('/user_type/:id' , AdminUserTypeController.destroy.bind(AdminUserTypeController));

//cooperator
adminRouter.get('/cooperator', AdminCooperatorController.index.bind(AdminCooperatorController));
adminRouter.get('/cooperator/:id' , AdminCooperatorController.single.bind(AdminCooperatorController));
adminRouter.post('/cooperator' , AdminCooperatorController.store.bind(AdminCooperatorController));
adminRouter.put('/cooperator/:id' , AdminCooperatorController.update.bind(AdminCooperatorController));
adminRouter.delete('/cooperator/:id' , AdminCooperatorController.destroy.bind(AdminCooperatorController));

//article
adminRouter.get('/article' , AdminArticleController.index.bind(AdminArticleController));
adminRouter.get('/article/:id' , AdminArticleController.single.bind(AdminArticleController));
adminRouter.post('/article' , AdminArticleController.store.bind(AdminArticleController));
adminRouter.put('/article/:id' , AdminArticleController.update.bind(AdminArticleController));
adminRouter.delete('/article/:id' , AdminArticleController.destroy.bind(AdminArticleController));

//group news
adminRouter.get('/groupnews' , AdminGroupNewsController.index.bind(AdminGroupNewsController));
adminRouter.get('/groupnews/:id' , AdminGroupNewsController.single.bind(AdminGroupNewsController));
adminRouter.post('/groupnews' , AdminGroupNewsController.store.bind(AdminGroupNewsController));
adminRouter.put('/groupnews/:id' , AdminGroupNewsController.update.bind(AdminGroupNewsController));
adminRouter.delete('/groupnews/:id' , AdminGroupNewsController.destroy.bind(AdminGroupNewsController));

//news
adminRouter.get('/news' , AdminNewsController.index.bind(AdminNewsController));
adminRouter.get('/news/:id' , AdminNewsController.single.bind(AdminNewsController));
adminRouter.post('/news' , AdminNewsController.store.bind(AdminNewsController));
adminRouter.put('/news/:id' , AdminNewsController.update.bind(AdminNewsController));
adminRouter.delete('/news/:id' , AdminNewsController.destroy.bind(AdminNewsController));

employeeRouter.get('/test',(req,res)=>{
    return res.json('hello');
})
router.use('/admin',adminRouter);

//router.use('/admin' , apiAuthAdmin, apiAdmin , adminRouter);
//router.use('/employee' , apiAuth , apiEmployee , employeeRouter);
//router.use('/agent' , apiAuth , apiAgent , adminRouter);
//router.use('/developer' , apiAuth , apiDeveloper , adminRouter);
//router.use('/customer' , apiAuth , apiCustomer , adminRouter);

//router.use('/admin',[ adminRouter,employeeRouter]);

//router.get('/user' , apiAuth ,UserController.index.bind(UserController));

//router.get('/user' , apiAuth ,(req,res)=>{return res.json('hello user')});

  router.use('/test',(req,res)=>{
    return res.json('hello');
})
module.exports = router;