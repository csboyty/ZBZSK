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
        imageSizeError:"图片大小不符合！",
        pleaseFillRequired:"请填写所有的必要字段！"
    },
    colorItemsTpl:[
        '{@each items as item}',
        '<div class="zyColorItem">',
        '<span class="zyColorShow" style="background:$${item}"></span>',
        '</div>',
        '{@/each}'
    ].join(''),
    colorAllOptionTpl:[
        '{@each items as item}',
        '<option value="$${item.value}">${item.name}</option>',
        '{@/each}'
    ].join(''),
    infoChildTrsTpl:[
        '{@each items as item,index}',
        '<tr>',
        '<td>$${item.imageString}</td>',
        '<td>${item.name}</td>',
        '<td>$${item.colorString}</td>',
        '<td>${item.texture}</td>',
        '<td>${item.hasBiaoZhi}</td>',
        '<td>$${item.infoFullString}</td>',
        '{@if type=="infoChild"}',
        '<td><a href="${item.id}" class="zyActionEdit">编辑</a></td>',
        '{@/if}',
        '</tr>',
        '{@/each}'
    ].join(''),
    infoChildTrTpl:[
        '<tr>',
        '<td>$${imageString}</td>',
        '<td>${name}</td>',
        '<td>$${colorString}</td>',
        '<td>${texture}</td>',
        '<td>${hasBiaoZhi}</td>',
        '<td>$${infoFullString}</td>',
        '<td><a href="${id}" class="zyActionEdit">编辑</a></td>',
        '</tr>'
    ].join(''),
    categoryAllOptionTpl:[
        '<option value="">产品类别</option>',
        '{@each items as item,index}',
        '<option value="${item.name}">${item.name}</option>',
        '{@/each}'
    ].join(""),
    categoryAllCheckboxTpl:[
        '{@each items as item,index}',
        '<input class="filled-in" name="category" value="${item.name}" ',
            'type="checkbox" id="category${idFlag}${index}"  />',
        '<label for="category${idFlag}${index}"  style="margin-right: 10px;">${item.name}</label>',
        '{@/each}'
    ].join(""),
    categoryTreeTpl:[
        '<option value="">全部结构</option>',
        '{@each items as item,index}',
        '<optgroup label="${item.name}">',
            '{@each item.childs as ic}',
                '<option value="${ic.name}">${ic.name}</option>',
            '{@/each}',
        '</optgroup>',
        '{@/each}'
    ].join(''),
    brandAllOptionTpl:[
        '<option value="">品牌</option>',
        '{@each items as item,index}',
        '<option value="${item.name}" data-value="${item.image}">${item.name}</option>',
        '{@/each}'
    ].join(""),
    brandAllCheckboxTpl:[
        '{@each items as item,index}',
        '<input class="filled-in" name="brand" value="${item.name}" type="checkbox" id="brand${idFlag}${index}"  />',
        '<label for="brand${idFlag}${index}"  style="margin-right: 10px;">',
        '<img src="${item.image}">${item.name}</label>',
        '{@/each}'
    ].join(""),
    textureAllCheckboxTpl:[
        '{@each items as item,index}',
        '<input class="filled-in" name="texture" value="${item.name}" ',
        'type="checkbox" id="texture${idFlag}${index}"  />',
        '<label for="texture${idFlag}${index}" style="margin-right: 10px;">${item.name}</label>',
        '{@/each}'
    ].join(''),
    styleAllTpl:[
        '{@each items as item,index}',
        '<div class="chip">',
        '${item}',
        '<i class="close material-icons">close</i>',
        '<input type="hidden" value="${item}" name="infoStyle">',
        '</div>',
        '{@/each}'
    ].join(''),
    styleTpl:[
        '<div class="chip">',
        '${data}',
        '<i class="close material-icons">close</i>',
        '<input type="hidden" value="${data}" name="infoStyle">',
        '</div>'
    ].join(''),
    cutImageTpl:[
        '<div style="width:${sizeW}px;height:${sizeW}px;overflow: hidden;display: inline-block">',
            '<img src="${src}" style="width:${realW}px;height: ${realH}px;margin-left: ${marginL}px;margin-top: ${marginT}px">',
        '</div>'
    ].join(''),
    initData:{
        brand:[
            {id:0, image:"/data/brand.png", name:"中联","opt":""}
        ],
        color:[
            {id:0,value:"red",name:"红色",opt:""}
        ],
        texture:[
            { id:0, name:"亚光", opt:""},
            { id:0, name:"亮光", opt:""}
        ],
        category:[
            { id:"00", pId:0, name:"结构类别", open:true, isParent:true},
            { id:1, pId:"00", name:"起重机",isParent:true},
            { id:3, pId:1, name:"上车",isParent:true},
            { id:4, pId:1, name:"下车",isParent:true},
            { id:5, pId:3, name:"驾驶室",isLeaf:true},
            { id:6, pId:3, name:"前脸",isLeaf:true},
            { id:7, pId:3, name:"操纵室",isLeaf:true},
            { id:8, pId:3, name:"转台",isLeaf:true},
            { id:9, pId:4, name:"侧护板",isLeaf:true},
            { id:10, pId:4, name:"支腿",isLeaf:true},
            { id:11, pId:4, name:"尾部",isLeaf:true}
        ],
        mgr:[
            {
                id:0,
                opt:"",
                imageChanPin:"/data/product1.svg",
                imageXianXin:"/data/product1.svg",
                brand:"Edinburgh",
                category:"起重机",
                marketType:"上市产品",
                marketDate:"2016.3.1",
                style:["简约","时尚"],
                modal:"xxxxx.fbx",
                texture:["亚光"],
                color:["red","blue","blue"],
                componentInfo:[
                    {
                        image:{
                            src:"/data/product1.svg",
                            customData:{boundW: 600, boundH: 600, x: 0.20333333333333334, y: 0.20833333333333334, ratio: 1}
                        },
                        name:"上车/摇臂",
                        texture:["亚光"],
                        color:["red"],
                        hasBiaoZhi:"",
                        infoFull:0,
                        appraise:"xxxxx"
                    }
                ]
            }
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
            dataValue=$(this).find("option:selected").data("value")||$(this).val();
        if(dataValue){
            if(parent.hasClass("zySelectHasImg")){
                parent.find(".zySShow").attr("src",dataValue);
            }else{
                parent.find(".zySShow").css("background-color",dataValue);
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
