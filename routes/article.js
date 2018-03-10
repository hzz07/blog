const express = require('express');
const router = express.Router();
const article = require('../controllers/article');
const upload=require('../library/upload');
const auth =require('../middleware/auth')
/* GET home page. */
//文章列表
router.get('/article', article.index);

//添加文章页面
router.get('/add',auth,article.add);

//添加文章
router.post('/save',auth, upload.single('img'), article.save);

//更新文章
router.post('/update/:id',upload.single('img'), article.update);

//获取文章
router.get('/getArticle/:id',article.get)
//删除文章
router.post('/delete/:id', article.del);

module.exports = router;
