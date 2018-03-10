$(function () {
    getArticleList()

})
var is_jing='';
var page = 1;
var key = '';

/*获取分类列表*/
function getArticleList() {
    $.get('/article/article',{page:page,key:key},function (data) {
        if (data.status == 1) {

            var list = data.result;
            console.log(list);
            var html = '';
            for (var i = 0; i < list.length; i++) {
                var articlelist = list[i];
                articlelist.create_at = moment(articlelist.create_at).format("YYYY-MM-DD");
                html += '<li class="col-md-4">'
                html += '<div class="excerpt-minic">'
                if(articlelist.img){
                    html += '<div class="manage-list-box1"><a href="javascript:;" onclick="editorArticle(\''+articlelist._id+'\')"><img src="/uploads/' + articlelist.img + '" class="img-responsive"\n' +
                        '                alt=' + articlelist.title + '\n' +
                        '                title=' + articlelist.title + '></a>'
                }

                html += '<h3><a href="javascript:;" onclick="editorArticle(\''+articlelist._id+'\')">' + articlelist.title + '</a></h3>'

                html += '</div>'
                html += '<div class="cat"><span>' + articlelist.create_at + '</span><span class="fr"><i\n' +
                    '             class="glyphicon glyphicon-pencil"></i><a onclick="editorArticle(\''+articlelist._id+'\')">编辑</a></span>\n' +
                    '                <span class="fr"><i class="glyphicon glyphicon-trash"></i><a href="javascript:;" onclick="deleteArticle(\''+articlelist._id+'\')">删除</a></span>\n' +
                    '                </div>'
                html += '</div>'
                html += '</li>'
            }
            $('#articleList').html(html);

            var totalPage = data.totalpage;
            page = data.page;

            var str='<li class="active"><a href="javascript:;">' + page + '</a></li>'
            if (totalPage > 1) {


                for (var i = 1; i <= 2; i++) {
                    if (page-i>1) {
                        str= '<li ><a href="javascript:;" onclick="setPage(' + (parseInt(page)-parseInt(i)) + ')"> ' + (parseInt(page)-parseInt(i)) + '</a></li>'+str;
                    }
                    if ( (parseInt(page)+parseInt(i))<totalPage) {
                        str=str+' '+'<li ><a href="javascript:;" onclick="setPage(' + (parseInt(page)+parseInt(i)) + ')">' + (parseInt(page)+parseInt(i)) + '</a></li>';
                    }
                }
                if(page-3>1){
                    str= '<li><a href="javascript:;" >...</a></li>'+str
                }
                if (page>1) {
                    str= '<li><a href="javascript:;" onclick="setPage(' + (parseInt(page) - 1) + ')">&laquo;</a></li>'+''+str
                }

                if(page+3<totalPage){
                    str= str+'<li><a href="javascript:;" >...</a></li>'
                }
                if(page<totalPage){
                    str=str+''+'<li><a href="javascript:;" onclick="setPage(' + (parseInt(page) + 1) + ')">&raquo;</a></li>'
                }

                    //
                    //
                    // <li class="disabled"><a href="#">2</a></li>
                    // <li><a href="#">3</a></li>
                    // <li><a href="#">4</a></li>
                    // <li><a href="#">&raquo;</a></li>
                }
                $("#pageList").html(str);

            }

    })
}


function setPage(p) {
    page = p;
    getArticleList();

}
function setKey() {
    key=$('#key').val();
    console.log(key);
    getArticleList();

}

/*获取详情*/

function addArticle() {

}

/*发布文章*/
function saveArticle() {


}


/*更新文章*/
function UpdateArticle() {
    var title = $("#title").val();
    var author = $("#author").val();
    var content = $(".w-e-text").html();
    var category_id = $("#category_id").val();
    var imgdata = $("#imgdata").val();
    var suffix = $("#suffix").val();
    let id=$('#articleId').val();
    $.post('/article/update/'+id, {
        is_jing:is_jing,
        title: title,
        author: author,
        content: content,
        category_id: category_id,
        imgdata:imgdata,
        suffix:suffix,
    }, function (data) {
        if (data.status == 1) {
            layer.msg(data.msg);
        } else {
            layer.msg(data.msg);
        }
    });
    getArticleList()
}

/*编辑文章*/
function editorArticle(id) {
    $('#articleId').val(id);
    $(".pubboxw").hide();

    $.get('/article/getArticle/'+id,function (data) {
        if(data.status==1){
            console.log(data.result);
            var getArticleList=data.result;
            $('#title').val(getArticleList.title);
            $('#author').val(getArticleList.author);

            $('.w-e-text').html(getArticleList.content);
            var Articlehtml='';
            Articlehtml+='<img src="/uploads/'+getArticleList.img+'" alt="">';
            var Articlehtml1='';
            if (getArticleList.is_jing == 1) {
                Articlehtml1 += '<input type="checkbox" name="is_jing" value="1" checked>'
            } else {
                Articlehtml1 += '<input type="checkbox" name="is_jing" value="0">'
            }



            $('#preview').html(Articlehtml);
            $('#is_jing').html(Articlehtml1);

            $(".pubbox").show();

        }
        $("[name='is_jing']").bootstrapSwitch({
            onText: "是",
            offText: "否",
            onColor: "success",
            offColor: "danger",
            size: "small",
        });

        $("[name='is_jing']").on('switchChange.bootstrapSwitch', function (event, state) {
            is_jing = state == true ? 1 : 0;
        })


    })

}

/*删除文章*/
function deleteArticle(id) {
    console.log(id);
    layer.confirm('是否删除？',{
        btn:['是','否']
    },function () {
        $.post('/article/delete/'+id,{},function (data) {
            if(data.status==1){
                layer.msg(data.msg);
                getArticleList()
            }
            else{
                layer.msg(data.msg);
            }
        })
    });

}