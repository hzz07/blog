const userModel = require('../models/user');
const CategoryModel = require('../models/category');
const md5 = require("md5");
const fs = require('fs');
const User = {
    //登陆
    login: (req, res, next) => {
        res.render('login');
    },

    doLogin: (req, res, next) => {
        let username = req.body.username;
        let password = req.body.password;
        userModel.findOne({username: username}).then(doc => {
            if (doc) {
                let user = doc;
                if (user.password == md5(password) != "") {
                    req.session.loginUser = user;
                    res.redirect('/');
                }
                else {
                    req.flash('error', '密码错误!');
                    res.redirect('/users/login');
                }
            }
            else {
                req.flash('error', '用户不存在！');
                res.redirect('/users/login');
            }
        })

    },

    //登出
    logout: (req, res, next) => {
        req.session.destroy(err => {
            res.redirect('/users/login');
        })
    },

    register: (req, res, next) => {
        res.render('register');
    },
    //创建
    creater: (req, res, next) => {
        const user = {
            username: req.body.username,
            password: md5(req.body.password)
        };
        userModel.create(user, function (err, data) {
            if (err) {
                console.log(err.stack);
                return;
            }
            req.flash('error', '已注册成功！');
            res.redirect('/users/login');

        })
    },
    personal: (req, res, next) => {
        let user = req.session.loginUser;
        console.log(user);
        CategoryModel.find().then(doc=>{
            res.render('personal',{
                CategoryList:doc,
                user: user
            })
        })
    },
    update: (req, res, next) => {
        console.log('------------');
        let user = req.session.loginUser;
        user.nickname = req.body.nickname;
        user.signature = req.body.signature;
        user.position = req.body.position;
        user.other = req.body.other;
        let imgData = req.body.imgdata;
        let suffix = req.body.suffix;

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
                    user.avatar = filename;
                    userModel.update({_id: user._id}, user).then(doc => {
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
            userModel.update({_id: user._id}, user).then(doc => {
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
    //更新密码
    updatePassword: (req, res, next) => {

    },
}
module.exports = User;