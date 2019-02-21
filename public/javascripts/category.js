$(function () {
    getCategoryList()

})


/*获取分类列表*/
function getCategoryList() {
    $.get('/category/index', function (data) {
        if (data.status == 1) {
            console.log(data)
            var list = data.result;
            var html = '';
            for (var i = 0; i < list.length; i++) {
                html += '<tr>'
                html += '<td>' + list[i].name + '</td>'
                html += '<td>' + list[i].path + '</td>'
                if (list[i].pid) {
                    html += '<td>' + list[i].pid.name + '</td>'
                } else {
                    html += '<td>无</td>'
                }
                html += '<td>' + list[i].sort + '</td>'
                if (list[i].is_nav == 1) {
                    html += '<td><input type="checkbox" name="is_nav" value="' + list[i]._id + '" checked></td>'
                } else {
                    html += '<td><input type="checkbox" name="is_nav" value="' + list[i]._id + '"></td>'
                }
                if (list[i].is_sys == 1) {
                    html += '<td style="color: red;">是</td>'
                } else {
                    html += '<td style="color: green">否</td>'
                }
                if (list[i].is_sys == 1) {
                    html += '<td><span style="color: #c0c0c0" class="btn-edit">编辑</span>' +
                        '<span style="color: #c0c0c0" class="btn-delete">删除</span></td>';
                } else {
                    html += '<td><a href="javascript:;" class="btn-edit"  onclick="editCategory(\'' + list[i]._id + '\')">编辑</a>' +
                        '<a href="javascript:;" class="btn-delete" onclick="deleteCategory(\'' + list[i]._id + '\')">删除</a></td>';
                }
                html += "</tr>";
            }
            $('#categoryList').html(html);
            $("[name='is_nav']").bootstrapSwitch({
                onText: "是",
                offText: "否",
                onColor: "success",
                offColor: "danger",
                size: "small",
            });
            $("[name='is_nav']").on('switchChange.bootstrapSwitch', function (event, state) {
                var id = event.target.value;
                var is_nav = state == true ? 1 : 0;
                $.get('/category/set-nav/' + id, {is_nav: is_nav}, function (data) {
                    if (data.status == 1) {
                        layer.msg(data.msg)
                    } else {
                        layer.msg(data.msg);
                    }
                })
            })
        }
    })
}

/*获取详情*/
function getCategory() {

}

function addCategory() {
    $('#id').val('');
    $('#name').val('');
    $('#path').val('');
    $('#sort').val('');
    $('#pid').val('');
    $('#template').val('');
    $('#myModal').modal('show');
}

/*保存分类*/
function saveCategory() {
    var id = $('#id').val();
    var name = $("#name").val();
    var path = $("#path").val();
    var sort = $("#sort").val();
    var pid = $("#pid").val();
    if(path.indexOf('/user/')==-1){
        path='/user/'+path
    }
    if(!pid){
        pid = '53ca42f418bfb23c1e04df02'
    }
    var template = $("#template").val();
    var is_nav = $("#is_nav").val();
    if (id) {
        /*修改添加*/
        $.post('/category/update/' + id, {
            name: name,
            path: path,
            sort: sort,
            pid: pid,
            template: template,
            is_nav: is_nav
        }, function (data) {
            if (data.status == 1) {
                layer.msg(data.msg);
                $("#myModal").modal('hide');
                getCategoryList();
            } else {
                layer.msg(data.msg);
            }
        })
    } else {
        /*保存添加*/
        $.post('/category/save', {
            name: name,
            path: path,
            sort: sort,
            pid: pid,
            template: template,
            is_nav: is_nav
        }, function (data) {
            if (data.status == 1) {
                $("#myModal").modal('hide');
                layer.msg(data.msg);
                getCategoryList();
            } else {
                layer.msg(data.msg);
            }
        })
    }


}


/*更新分类*/
function UpdateCatepory() {

}

/*编辑分类*/
function editCategory(id) {
    $.get('/category/' + id, function (data) {
        if (data.status == 1) {
            console.log(data.result);

            var category = data.result;
            $("#id").val(category._id);
            $("#name").val(category.name);
            $("#path").val(category.path);
            $("#sort").val(category.sort);
            $("#pid").val(category.pid);
            $("#template").val(category.template);
            $("#is_nav").val(category.is_nav);
            $('#myModal').modal('show');

        } else {
            layer.msg(data.msg);
        }
    })
}

/*删除分类*/
function deleteCategory(id) {
    layer.confirm('是否删除？', {
        btn: ['是', '否']
    }, function () {
        $.post('/category/delete/' + id, {}, function (data) {
            if (data.status == 1) {
                layer.msg(data.msg);
                getCategoryList();
            } else {
                layer.msg(data.msg);
            }

        })
    })
}
