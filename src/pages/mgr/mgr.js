var mgr=(function(config,ZYCtrlDataHandler){

    return {
        initData:function(){
            $("#searchBrand").html(ZYCtrlDataHandler.getBrandItems("checkbox"));
            $("#searchTexture").html(ZYCtrlDataHandler.getTextureItems());
        }
    };
})(config,ZYCtrlDataHandler);

$(document).ready(function(){

    mgr.initData();

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

    var table=new ZYTableHandler({
        keyName:"mgr",
        ownTable:function(data){
            var dtTable=$('#myTable').dataTable( {
                "bServerSide": false,
                "bInfo":true,
                "bLengthChange": false,
                "bFilter": false,
                "bSort":false,
                "bAutoWidth": false,
                "iDisplayLength":config.perLoadCounts.table,
                "sPaginationType":"full_numbers",
                "oLanguage": {
                    "sUrl":config.dataTable.langUrl
                },
                aaData: data,
                aoColumns: [
                    { "mDataProp": "imageChanPin",
                        "fnRender":function(oObj){
                            return  "<img class='thumb' src='"+oObj.aData.imageChanPin+"'>";
                        }
                    },
                    { "mDataProp": "brand"},
                    { "mDataProp": "category"},
                    { "mDataProp": "texture",
                        "fnRender":function(oObj){
                            return  oObj.aData.texture.join("/");
                        }},
                    { "mDataProp":"marketDate"},
                    { "mDataProp": "color",
                        "fnRender":function(oObj){
                            return juicer(config.colorItemTpl,{
                                items:oObj.aData.color
                            })
                        }},
                    { "mDataProp": "opt",
                        "fnRender":function(oObj){
                            return  '<a href="/pages/mgr/cou/cou.html?'+oObj.aData.id+'">编辑</a>&nbsp;&nbsp;'+
                                '<a href="'+oObj.aData.id+'" class="remove">删除</a>';
                        }
                    }
                ]
            });

            return dtTable;
        }
    });

    $("#myTable").on("click","a.remove",function(){
        if(confirm(config.messages.confirmDelete)){
            table.delete($(this).attr("href"));
        }
        return false;
    })
});