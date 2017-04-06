var mgr=(function(config,ZYCtrlDataHandler){

    return {
        table:null,
        getSearchInfo:function(){
            var params={};
            params.style=$("#searchStyleInput").val();
            params.startDate=$("#searchStartDate").val();
            params.endDate=$("#searchEndDate").val();
            params.marketType=[];
            $("#searchMarketType").find("input[type='checkbox']").each(function(index,el){
                el=$(el);
                if(el.prop("checked")){
                    params.marketType.push(el.val());
                }
            });

            params.brand=$("#searchBrand").val();
            params.mainColor=$("#searchMainColor").val();
            params.assistColor1=$("#searchAssistColor1").val();
            params.assistColor2=$("#searchAssistColor2").val();
            params.texture=[];
            $("#searchTexture").find("input[type='checkbox']").each(function(index,el){
                el=$(el);
                if(el.prop("checked")){
                    params.texture.push(el.val());
                }
            });

            return params;

        },
        search:function(){
            this.table.tableSearch(this.getSearchInfo());
        },
        initSearchHandler:function(){
            var me=this;
            $("#search").on("click","input[type='checkbox'],.zyActionSearchByClick",function(){
                me.search();
            }).on("change",".zyActionSearchByChange",function(){
                me.search();
            });
        },
        initData:function(){
            $("#searchBrand").html(ZYCtrlDataHandler.getBrandItems("checkbox"));
            $("#searchTexture").html(ZYCtrlDataHandler.getTextureItems());
            $("#searchMainColor").append(ZYCtrlDataHandler.getColorItems("option"));
            $("#searchAssistColor1").append(ZYCtrlDataHandler.getColorItems("option"));
            $("#searchAssistColor2").append(ZYCtrlDataHandler.getColorItems("option"));
        }
    };
})(config,ZYCtrlDataHandler);

$(document).ready(function(){

    mgr.initData();
    mgr.initSearchHandler();

    $("#zySearchCollapse").click(function(){
        if($(this).data("target").indexOf("up")!=-1){
            $("#search .zySearchRow").hide(400);
            $(this).find(".material-icons").text("keyboard_arrow_down");
            $(this).data("target","down");
            $(this).find(".zyCCText").text("展开选项");
        }else{
            $("#search .zySearchRow").show(400);
            $(this).find(".material-icons").text("keyboard_arrow_up");
            $(this).data("target","up");
            $(this).find(".zyCCText").text("收起选项");
        }
    });

    mgr.table=new ZYTableHandler({
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
                            return juicer(config.colorItemsTpl,{
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
        mgr.table.delete($(this).attr("href"));
        return false;
    })
});