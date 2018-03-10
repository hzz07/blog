// 选项卡导航

function view(file) {
    var div = document.getElementById('center_1');
    console.log(file.files);

    if (file.files && file.files[0]) {
        var fileRrader = new FileReader();
        fileRrader.onload = function (ev) {
            div.innerHTML = "<img src='" + ev.target.result + "'>";
        }
        fileRrader.readAsDataURL(file.files[0]);
    }
    else{
        div.innerHTML='<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\''+file.value+'\'"></div>'
    }
};

