var cou=(function(config){

    return {
        cutCtrl:null,
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
        updateCutImage:function(){
            var cutImage=$("#cutImage"),
                customData=this.cutCtrl.customData;
            var cssObj=config.computeImageCss(100,customData);



            cutImage.attr("src",customData.src);
            cutImage.css({
                width:cssObj.realW,
                height:cssObj.realH,
                marginLeft:cssObj.marginL,
                marginTop:cssObj.marginT
            });
        }
    }
})(config);
$(document).ready(function(){

    $('#cutImageModal').modal();
    $("#previewModal").modal();

    $("#cutImageType").on("click",".zyGBItem",function(){
        var type=$(this).data("type");
        var imageSrc="/images/product1.svg";

        switch(type){
            case "tezhengxian":
                imageSrc="/images/product1.svg";

                break;
            case "changpin":
                imageSrc="/images/product1.svg";

                break;
        }

        $("#cutImageType").find(".zyGBItemActive").removeClass("zyGBItemActive");
        $(this).addClass("zyGBItemActive");
        $("#toCutImage").attr("src",imageSrc);

        cou.initJCrop();
    });

    $("#cutImage").click(function(){
        $('#cutImageModal').modal('open');
        cou.initJCrop();
    });

    $("#previewBtn").click(function(){
        $("#previewModal").modal("open");
    });

    $("#saveCutImage").on("click",function(){
        cou.updateCutImage();
        $('#cutImageModal').modal('close');
    });

});

