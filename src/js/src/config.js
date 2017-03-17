/**
 * Created with JetBrains WebStorm.
 * User: ty
 * Date: 14-10-5
 * Time: 下午5:34
 * To change this template use File | Settings | File Templates.
 */
var config={
    baseUrl:"",
    ajaxUrls:{
        musicGetAll:"music/list",
        musicDelete:"music/delete",
        videoGetAll:"video/list",
        videoDelete:"video/delete",
        postGetAll:"post/list",
        postDelete:"post/delete"
    },
    status:{
        is_featured:{
            "0":"不置顶",
            "1":"置顶"
        }
    },
    dataTable:{
        langUrl:"/lang/de_DE.txt"
    },
    perLoadCounts:{
        table:10
    },
    uploader:{
        url:"#",
        getSignatureUrl:"a-li-yun/get-signature",
        swfUrl:"js/lib/Moxie.swf",
        sizes:{
            all:"5120m",
            img:"2m"
        },
        filters:{
            all:"*",
            zip:"zip,rar",
            img:"jpg,JPG,jpeg,JPEG,png,PNG",
            pdf:"pdf,PDF"
        }
    },
    validErrors:{
        required:"请输入此字段！",
        email:"请输入正确的邮箱格式！",
        emailExist:"邮箱已经存在！",
        uploadImg:"请上传图片！",
        number:"请输入数字",
        maxLength:"此字段最多输入${max}个字！",
        minLength:"此字段最少输入${min}个字！",
        rangLength:"此字段只能输入${min}-${max}个字！",
        rang:"此字段只能输入${min}-${max}之间的整数！",
        pwdNotEqual:"两次输入的密码不一样！"
    },
    messages:{
        successTitle:"成功提示",
        errorTitle:"错误提示",
        optSuccess:"操作成功！",
        noData:"没有数据",
        progress:"处理中...",
        uploaded:"上传完成！",
        confirmDelete:"确定删除吗？",
        confirm:"确定执行此操作吗？",
        noSelected:"没有选中任何记录！",
        notFound:"资源丢失！",
        loadDataError:"请求数据失败！",
        networkError:"网络异常，请稍后重试！",
        systemError:"系统错误，请稍后重试或者联系mail@lotusprize.com！",
        optSuccRedirect:"操作成功,3秒后跳转到管理页！",
        timeout:"登录超时，3秒后自动跳到登陆页！",
        optError:"服务器端异常，请稍后重试！",
        uploadSizeError:"最大文件大小${value}！",
        uploadExtensionError:"只允许上传${value}！",
        uploadIOError:"上传出错，请稍后重试！",
        imageSizeError:"图片大小不符合！"
    },
    initData:{
        brand:[
            {id:0, image:"/images/brand.png", name:"Edinburgh","opt":""}
        ],
        color:[
            {id:0,value:"red",name:"红色",opt:""}
        ],
        texture:[
            { id:0, name:"亚光", opt:""},
            { id:0, name:"亮光", opt:""}
        ],
        category:[
            { id:"00", pId:0, name:"汽车类别", open:true},
            { id:1, pId:"00", name:"起重机"},
            { id:2, pId:"00", name:"吊车"},
            { id:3, pId:1, name:"上车"},
            { id:4, pId:1, name:"下车"},
            { id:5, pId:3, name:"驾驶室"},
            { id:6, pId:3, name:"前脸"},
            { id:7, pId:5, name:"操纵室"},
            { id:8, pId:5, name:"转台"},
            { id:9, pId:6, name:"侧护板"},
            { id:10, pId:6, name:"支腿"},
            { id:11, pId:6, name:"尾部"}
        ]
    },
    findInArray:function(list,key,keyValue){
        var index=-1;
        for(var i=0,len=list.length;i<len;i++){
            if(list[i][key]==keyValue){
                index=i;
                break;
            }
        }

        return index;
    },
    computeImageCss:function(showWidth,customData){
        var rw=showWidth/customData.w,ry=showWidth/customData.h,
            realW=rw*customData.boundW,realH=rw*customData.boundH,
            marginL=-customData.x*realW,marginT=-customData.y*realH;

        return {
            realW:realW,
            realH:realH,
            marginL:marginL,
            marginT:marginT
        }
    }
};
$(document).ready(function(){

    $("input[type='text'],input[type='email']").blur(function(){
        $(this).val($(this).val().trim());
    });

    //火狐里面阻止form提交
    $("input[type='text'],input[type='password']").keydown(function(e){
        if(e.keyCode==13){
            return false;
        }
    });

    $(".link").click(function(){
        var subMenu=$(this).parent().find(".subMenu");
        if(subMenu){
            subMenu.toggle();
        }
    });

    $(".zySelect .zySSelect").change(function(){
        var parent=$(this).parent(".zySelect"),
            val=$(this).val();
        if(val){
            if(parent.hasClass("zySelectHasImg")){
                parent.find(".zySShow").attr("src",val);
            }else{
                parent.find(".zySShow").css("background-color",val);
            }
            parent.removeClass("zyNoSelect");
        }else{
            parent.addClass("zyNoSelect");
        }
    });

    if(pageName){
        var target=$("a[data-page-name='"+pageName+"']");
        if(target){
            target.addClass("active");

            if(target.parents(".subMenu")){
                target.parents(".subMenu").prev(".link").addClass("active");
            }
        }

    }
});
