const express = require('express');
const route = express.Router();
const category = require('../controllers/category');

/**
 * 分类列表
 */
route.get('/index',category.index);

/**
 * 分类详情
 */
route.get('/:id', category.get);

/**
 * 分类保存
 */
route.post('/save', category.save);

/**
 * 更新分类
 */
route.post('/update/:id',category.update)

/**
 * 删除分类
 */
route.post('/delete/:id',category.delete);

route.get('/set-nav/:id',category.set_nav);


module.exports = route;