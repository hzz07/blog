const ArticleModel = require('../models/article');
const CategoryModel = require('../models/category');
const moment=require('moment');
const fs=require('fs');
const Article = {
    //
    index: (req, res, next) => {
        // 搜索关键字
        let key = req.query.key;
        let page=req.query.page?req.query.page:1;
        let is_jing= req.query.is_jing;
        let limit = 6;
        let regex = new RegExp(key);
        // 分页
        let count = 0;
        let totalpage = 0;
        let where = {};
        if (key) {
            where.title= {$regex: regex};
        }
        if(is_jing){
            where.is_jing=1
        }
        //排序
        ArticleModel.find(where).count().then((doc => {
            let articleget=doc;
            count = doc;
            totalpage = Math.ceil(count / limit);
            ArticleModel.find(where).skip((page - 1) * limit).limit(limit).sort({create_at: 'desc'}).then((doc) => {

                res.json({
                    status:1,
                    result:doc,
                    page:page,
                    count:count,
                    totalpage:totalpage,


                })

            }).catch(err=>{
                res.json({
                    status:0,
                    msg:'获取失败！'
                })
            })
        }))

    },
    //获取单页文章
    get: (req, res, next) => {
        let id = req.params.id;
        ArticleModel.findOne({_id: id}).then(doc => {
            res.json({
                status:1,
                result:doc
            });
        }).catch(err=>{
            res.json({
                status:0,
                msg:"获取失败！"
            })
        })
    },
    // * 展示发布文章页面
    // */
    add: (req, res, next) => {
        CategoryModel.find({is_sys: 0}).then(doc => {
            res.render('add', {category: doc});
        })
    },
    //保存
    save: (req, res, next) => {
        let articleModel = new ArticleModel({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            is_jing: req.body.is_jing,
            status: req.body.status,
            img: req.file.filename,
            category_id: req.body.category_id
            // title:req.body.title,
            // category_id:req.body.category_id,
            // user_id:req.body.user_id,
        });
        console.log(articleModel);
        articleModel.save();

        res.redirect('/');


    },
    //更新
    update: (req, res, next) => {
        console.log('------------');
        let id = req.params.id;
        let is_jing = req.body.is_jing;
        let title = req.body.title;
        let author = req.body.author;
        let content = req.body.content;
        let category_id=req.body.category_id;
        let imgData = req.body.imgdata;
        let suffix = req.body.suffix;
        let img='';

        let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");

        //保存编码到缓冲区
        var dataBuffer = new Buffer(base64Data, 'base64');

        if (base64Data) {
            //将缓冲区写入到文件中
            let filename = Date.now() + suffix;
            fs.writeFile("./public/uploads/" + filename, dataBuffer, function (err) {
                if (err) {
                    res.json({
                        'status': 0,
                        'msg': '修改失败！'
                    })
                }
                {
                    img = filename;

                    ArticleModel.update({_id:id}, {
                        is_jing:is_jing,
                        title: title,
                        author: author,
                        content: content,
                        category_id: category_id,
                        img:img,
                    }).then(doc => {
                        res.json({
                            'status': 1,
                            'msg': '修改成功！'
                        })
                    }).catch(err => {
                        res.json({
                            'status': 0,
                            'msg': '修改失败！'
                        })
                    });
                }
            });
        } else {
            ArticleModel.update({_id: id}, {
                is_jing:is_jing,
                title: title,
                author: author,
                content: content,
                category_id: category_id,
                img:'',
            }).then(doc => {
                res.json({
                    'status': 1,
                    'msg': '修改成功！'
                })
            }).catch(err => {
                res.json({
                    'status': 0,
                    'msg': '修改失败！'
                })
            });
        }
    },
    //删除
    del: (req, res, next) => {
        let id = req.params.id;
        ArticleModel.remove({_id: id}).then(doc => {
            res.json({
                status: 1,
                msg: '删除成功！'
            })
        }).catch(err => {
            res.json({
                status: 0,
                msg: '删除失败！'
            })
        });
    },


}

module.exports = Article;