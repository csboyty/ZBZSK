var cou=(function(config){

    return {
        cutCtrl:null,
        componentInfo:[],
        initJCrop:function(){
            var me=this;

            if(me.cutCtrl){
                me.cutCtrl.destroy();
            }

            $('#toCutImage').Jcrop({
                boxWidth:600,
                boxHeight:600,
                onSelect: function(c){
                    me.cutCtrl.customData.x=c.x/me.cutCtrl.customData.boundW;
                    me.cutCtrl.customData.y=c.y/me.cutCtrl.customData.boundH;
                    me.cutCtrl.customData.ratio=1;
                    me.cutCtrl.customData.w=c.w;
                    me.cutCtrl.customData.h=c.h;
                    me.cutCtrl.customData.src=$('#toCutImage').attr("src");
                },
                aspectRatio: 1
            },function(){
                me.cutCtrl=this;
                var bounds=this.getBounds();
                me.cutCtrl.customData= {
                    boundW: bounds[0],
                    boundH: bounds[1]
                }
            });
        },
        updateCutImage:function(customData){
            var cutImage=$("#cutImage");
            var cssObj=ZYCtrlDataHandler.computeImageCss(100,customData);



            cutImage.attr("src",customData.src);
            cutImage.css({
                width:cssObj.realW,
                height:cssObj.realH,
                marginLeft:cssObj.marginL,
                marginTop:cssObj.marginT
            });
        },
        validInfo:function(el){
            var requiredEls=el.find(".zyActionRequired"),
                valid=true;
            $.each(requiredEls,function(index,el){
                el=$(el);
                if(el.hasClass("zyActionCheckbox")){
                    if(el.find("input:checked").length==0){
                        valid=false;
                        return false;
                    }
                }else if(el.hasClass("zyActionHidden")){
                    if(el.find("input[type='hidden']").length==0){
                        valid=false;
                        return false;
                    }
                }else{
                    if(el.val()==""){
                        valid=false;
                        return false;
                    }
                }
            });
            if(valid==false){
                Materialize.toast(config.messages.pleaseFillRequired, 4000);
            }

            return valid;
        },
        setHtmlForInfoChildTable:function(list,tableTbody){

            var item;
            for(var j=0,jLen=list.length;j<jLen;j++){
                item=list[j];

                //imageString在编辑的时候会处理
                if(!item.imageString){
                    item.imageString="";
                }

                if(!item.infoFullString){
                    item.infoFullString=item.infoFull==1?'<i class="material-icons green-text">done</i>':'<i class="material-icons red-text">close</i>';
                }

                if(!item.colorString){
                    item.colorString=item.color?'<div class="zyColorItem">'+
                        '<span class="zyColorShow" style="width: 20px;height: 20px;background: '+item.color+'"></span>'+
                        '</div>':"";
                }

            }

            tableTbody.html(juicer(config.infoChildTrsTpl,{
                type:tableTbody.data("type"),
                items:list
            }));
        },
        initInfoChildTable:function(tableTbody){
            var categories=JSON.parse(localStorage.getItem("category")),
                arr=[],parent;
            for(var i=0,len=categories.length;i<len;i++){
                if(categories[i].isLeaf){
                    arr.push(categories[i]);
                    parent=categories[config.findInArray(categories,"id",categories[i].pId)];
                    this.componentInfo.push({
                        id:"iC"+i,
                        image:{},
                        name:parent.name+"/"+categories[i].name,
                        texture:[],
                        color:[],
                        hasBiaoZhi:"无",
                        infoFull:0
                    });
                }
            }

            this.setHtmlForInfoChildTable(this.componentInfo,tableTbody);
        },
        filterInfoChildTable:function(filter,tableTbody){
            var arr=[];
            for(var i=0,len=this.componentInfo.length;i<len;i++){
                if(this.componentInfo[i].name.indexOf(filter)!=-1){
                    arr.push(this.componentInfo[i]);
                }
            }

            this.setHtmlForInfoChildTable(arr,tableTbody);
        },
        infoChildSave:function(){
            var component=this.componentInfo[this.infoChildIndex];

            if(this.cutCtrl&&this.cutCtrl.customData){
                component.image.src=this.cutCtrl.customData.src;
                component.image.customData=this.cutCtrl.customData;
                component.imageString=ZYCtrlDataHandler.getCutImageEl(100,this.cutCtrl.customData);
            }
            component.hasBiaoZhi=$("#infoChildAdd input[name='biaoZhi']").val();
            component.color=$("#iCAddColor").val();
            component.texture=$("#iCAddTexture input:checked").map(function(){
                return $(this).val();
            }).get().join(',');
            component.infoFull=component.image.src&&component.color&&component.hasBiaoZhi&&component.texture?1:0;
            component.appraise=$("#iCAddAppraise").val();


            component.infoFullString=component.infoFull==1?'<i class="material-icons green-text">done</i>':'<i class="material-icons red-text">close</i>';
            component.colorString=component.color?'<div class="zyColorItem">'+
                '<span class="zyColorShow" style="width: 20px;height: 20px;background: '+component.color+'"></span>'+
                '</div>':"";


            this.currentInfoChildTr.replaceWith(juicer(config.infoChildTrTpl,component));

            this.showInfoChildMgr();
        },
        clearICAdd:function(){
            $("#iCAddColor").val("").prev().removeAttr("style");
            $("#iCAddTexture input[type='checkbox']").prop("checked",false);
            $("#iCAddAppraise").val("");
            $("#cutImage").attr("src","/images/cut.png").removeAttr("style");

            if(this.cutCtrl){
                delete this.cutCtrl.customData;
            }
        },
        initICAdd:function(){
            var component=this.componentInfo[this.infoChildIndex];
            $("#iCAddColor").val(component.color).prev().css("background",component.color);
            $("#iCAddTexture input[type='checkbox']").each(function(index,el){
                if(component.texture.indexOf($(this).val())!=-1){
                    $(this).prop("checked",true);
                }
            });
            $("#iCAddAppraise").val(component.appraise);
            if(component.image.customData){
                this.updateCutImage(component.image.customData);
                this.cutCtrl.customData=component.image.customData;
            }
        },
        showInfoChildMgr:function(){
            $("#infoChildMgr").removeClass("hide");
            $("#infoChildAdd").addClass("hide");

            this.clearICAdd();
        },
        hideInfoChildMgr:function(){
            $("#infoChildMgr").addClass("hide");
            $("#infoChildAdd").removeClass("hide");

            this.initICAdd();
        },
        getSubmitData:function(){
            var data={};

            data.imageChanPin=$("#infoImageChanPin").val();
            data.imageXianXin=$("#infoImageXianXin").val();
            data.brand=$("#infoBrand").val();
            data.category=$("#infoCategory").val();
            data.marketType=$("input[name='infoMarketType']").val();
            data.marketDate=$("#infoMarketDate").val();
            data.style=[];
            $("input[name='infoStyle']").each(function(index,el){
                data.style.push($(el).val());
            });
            data.modal=$("#infoModal").val();
            data.texture=[];
            $("#infoTexture").find("input[type='checkbox']").each(function(index,el){
                data.texture.push($(el).val());
            });
            data.color=[$("#infoMainColor").val(),$("#infoAssistColor1").val(),$("#infoAssistColor2").val()];
            data.componentInfo=this.componentInfo;

            this.submitData=data;

            return data;
            
        },
        initData:function(){
            $("#infoCategory").html(ZYCtrlDataHandler.getCategoryFirstLevelItems("option"));
            $("#infoBrand").html(ZYCtrlDataHandler.getBrandItems("option"));
            $("#infoTexture").html(ZYCtrlDataHandler.getTextureItems());
            $("#iCAddTexture").html(ZYCtrlDataHandler.getTextureItems("iCAdd"));
            $(".zyActionCategory").html(ZYCtrlDataHandler.getCategoryTreeItems()).material_select();
            this.initInfoChildTable($("#infoChildTable tbody"));

            if(location.search){
                this.editId=location.search.substr(1);
                $("#remove").removeClass("hide");
            }
        }
    }
})(config,ZYCtrlDataHandler);
$(document).ready(function(){
    var formHandler=new ZYFormHandler({
        keyName:"mgr",
        redirectUrl:"/pages/mgr/mgr.html"
    });

    cou.initData();

    $("#tab a").click(function(e){
        if($(this).attr("href")=="#infoChild"){
            if(!cou.validInfo($("#info"))){
                return false;
            }
        }
    });
    $("input[name='infoImage']").change(function(){
        var name=this.files[0].name,
            url="/data/"+name;

        $(this).next().val(url);
        $(this).prev().attr("src",url);
    });
    $("#uploadModal").change(function(){
        var name=this.files[0].name,
            url="/data/"+name;

        $("#infoModal").val(url);
        $("#infoModalShow").text(name);
    });
    $("#infoAddStyle").click(function(){
        var value=$("#infoStyleInput").val();
        if(value){
            $("#infoStyle").append(juicer(config.styleTpl,{
                data:value
            }));

            $("#infoStyleInput").val("");
        }
    });

    /**********************************分结构信息*******************************/
    $("#infoChildTable").on("click",".zyActionEdit",function(){
        cou.currentInfoChildTr=$(this).parents("tr");
        cou.infoChildIndex=config.findInArray(cou.componentInfo,"id",$(this).attr("href"));
        cou.hideInfoChildMgr();
        return false;
    });
    $("#infoChildSearch").change(function(){
        cou.filterInfoChildTable($(this).val(),$("#infoChildTable tbody"));
    });
    $('#cutImageModal').modal();

    $("#cutImageType").on("click",".zyGBItem",function(){
        var type=$(this).data("type"),
            xianXinSrc=$("#infoImageXianXin").val(),
            chanPinSrc=$("#infoImageChanPin").val(),
            imageSrc;

        switch(type){
            case "tezhengxian":
                imageSrc=xianXinSrc?xianXinSrc:chanPinSrc;

                break;
            case "changpin":
                imageSrc=chanPinSrc;

                break;
        }

        $("#cutImageType").find(".zyGBItemActive").removeClass("zyGBItemActive");
        $(this).addClass("zyGBItemActive");
        $("#toCutImage").attr("src",imageSrc);

        cou.initJCrop();
    });

    $("#cutImage").click(function(){
        $('#cutImageModal').modal('open');
        $("#toCutImage").attr("src",$("#infoImageChanPin").val());
        cou.initJCrop();
    });

    $("#saveCutImage").on("click",function(){
        cou.updateCutImage(cou.cutCtrl.customData);
        $('#cutImageModal').modal('close');
    });

    $("#infoChildCancel").click(function(){
        cou.showInfoChildMgr();
    });

    $("#infoChildSave").click(function(){
        cou.infoChildSave();
    });


    /*****************************预览部分************************/
    $("#previewModal").modal();
    $("#previewBtn").click(function(){
        var submitData=cou.getSubmitData();

        $("#pInfoCategory").text(submitData.category);
        $("#pInfoType").text(submitData.marketType);
        $("#pInfoMarketDate").text(submitData.marketDate);
        $("#pInfoBrand").text(submitData.brand);
        $("#pImageChanPin").attr("src",submitData.imageChanPin);
        $("#pImageXianXin").attr("src",submitData.imageXianXin);
        $("#pInfoTexture").text(submitData.texture.join(','));
        $("#pInfoMainColor").css("background",submitData.color[0]);
        $("#pInfoAssistColor1").css("background",submitData.color[1]);
        $("#pInfoAssistColor2").css("background",submitData.color[2]);
        $("#pInfoStyle").text(submitData.style.join(","));
        $("#pInfoModal").attr("href",submitData.modal).text(submitData.modal);

        cou.setHtmlForInfoChildTable(submitData.componentInfo,$("#pInfoChildTable tbody"));

        $("#previewModal").modal("open");
    });
    $("#pInfoChildTableSearch").change(function(){
        cou.filterInfoChildTable($(this).val(),$("#pInfoChildTable tbody"));
    });
    $("#save").click(function(){
        if(!cou.submitData){
            cou.getSubmitData();
        }

        formHandler.submitForm(cou.submitData,cou.editId?cou.editId:undefined);

    });
    $("#remove").click(function(){
        formHandler.remove(cou.editId);
    });

});

