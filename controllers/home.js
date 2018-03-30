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
            ArticleModel.find(where).skip((page - 1) * limit).limit(limit).sort({create_at: 'desc'}).then((doc) => {
                // res.json(doc)
                let articlelist=doc;
                for (let i=0;i<articlelist.length;i++){
                    articlelist[i].content = articlelist[i].content.replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, "").substr(0, 100) + '……';

                }

                res.render('index',{
                    article:articlelist,
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
        let cateporyPath = req.params.category;
        cateporyPath='/cg/'+cateporyPath
        var cateporylist='';
        let loginUser=req.session.loginUser;
        let page=req.query.page?req.query.page:1;
        let totalPage = 0;
        let count=3;
        let limit=4
        CateporyModel.findOne({path:cateporyPath}).then(doc=>{
            cateporylist=doc
            let id=cateporylist._id;
            ArticleModel.find({category_id:id}).count().then(doc=>{
                count = doc;
                totalPage = Math.ceil(count / limit);
                ArticleModel.find({category_id:id}).skip((page - 1) * limit).limit(limit).sort({create_at: 'desc'}).then(doc=>{
                    let cateporyArticle=doc;
                    for (let i=0;i<cateporyArticle.length;i++){
                        cateporyArticle[i].content = cateporyArticle[i].content.replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, "").substr(0, 100) + '……';

                    }
                    res.render('index',{
                        count:count,
                        article:cateporyArticle,
                        loginUser:loginUser,
                        totalPage:totalPage,
                        page:page,
                    })


            })
        });


    })
    }
}
module.exports = Home;