const ArticleModel = require('../models/article')
const CateporyModel = require('../models/category');
const userModel = require('../models/user');
const Home = {
    //
    // *首页
    // */
    index: (req, res, next) => {
        //列表 分页 搜索 排序
        let key = req.query.key;
        let regex = new RegExp(key);
        let count = 0;
        let limit = 5;
        let page = req.query.page?req.query.page:1;
        let totalPage = 0;
        let where = {};
        let loginUser=req.session.loginUser;
        if (key) {
            where = {title: {$regex: regex}};
        }
        ArticleModel.find(where).count().then((doc) => {
            count = doc;
            totalPage = Math.ceil(count / limit);
            ArticleModel.find(where).skip((page - 1) * limit).limit(5).sort({create_at: 'desc'}).then((doc) => {
                // res.json(doc)
                res.render('index',{
                    article:doc,
                    count:count,
                    page:page,
                    totalPage:totalPage,
                    loginUser:loginUser
                });

            })
        });



    },
    /**
     * 栏目页
     */
    category: (req, res, next) => {
        //列表 分页 搜索 排序
        let cateporyPath=req.params.category;
        console.log(cateporyPath)
        CateporyModel.findOne({path:'/'+cateporyPath}).then((doc) => {
            let key = req.query.key;
            let regex = new RegExp(key);
            let count = 0;
            let limit = 5;
            let page = req.query.page?req.query.page:1;
            let totalPage = 0;
            let where = {
                catepory_id:doc._id
            };
            if (key) {
                where = {title: {$regex: regex}};
            }
            ArticleModel.find(where).count().then((doc) => {
                count = doc;
                totalPage = Math.ceil(count / limit);
                ArticleModel.find(where).skip((page - 1) * limit).limit(5).sort({create_at: 'desc'}).then((doc) => {
                    // res.json(doc)
                    res.render('index',{
                        article:doc
                    });

                })
            })
        })
    }
}
module.exports = Home;