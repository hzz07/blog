const express = require('express');
const router = express.Router();
const user=require('../controllers/user');
const auth=require('../middleware/auth')

/* GET users listing. */
// 登录页
router.get('/login',user.login);
// 提交登录
router.post('/login',user.doLogin);
// 退出登录
router.get('/logout',user.logout);

router.post('/register',user.creater);
router.get('/register',user.register);
router.get('/personal',auth,user.personal);
router.post('/personal',user.update)


module.exports = router;
