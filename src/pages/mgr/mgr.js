$(document).ready(function(){
    $("#zySearchCollapse").click(function(){
        if($(this).data("target").indexOf("up")!=-1){
            $("#zySearch .zySearchRow").hide(400);
            $(this).find(".material-icons").text("keyboard_arrow_down");
            $(this).data("target","down");
            $(this).find(".zyCCText").text("展开选项");
        }else{
            $("#zySearch .zySearchRow").show(400);
            $(this).find(".material-icons").text("keyboard_arrow_up");
            $(this).data("target","up");
            $(this).find(".zyCCText").text("收起选项");
        }

    });
});