$(document).ready(function(){
    var formHandler=new ZYFormHandler({
        redirectUrl:"/pages/brand/brand.html",
        keyName:"brand"
    });
    $("#myForm").validate({
        ignore:[],
        rules:{
            name:{
                required:true,
                maxlength:32
            },
            image:{
                required:true
            }
        },
        messages:{
            name:{
                required:config.validErrors.required,
                maxlength:config.validErrors.maxLength.replace("${max}",32)
            },
            image:{
                required:config.validErrors.required
            }
        },
        submitHandler:function(form) {
            formHandler.submitForm(form);
        }
    });

    $("#uploadFile").change(function(){
        var name=this.files[0].name,
            url="/images/data/"+name;

        $("#image").val(url);
        $("#imageShow").attr("src",url);
    });
});