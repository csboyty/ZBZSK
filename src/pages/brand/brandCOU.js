$(document).ready(function(){
    var editId;
    if(location.search){
        editId=location.search.substr(1);
        var data=JSON.parse(localStorage.getItem("brand"));
        data=data[config.findInArray(data,"id",editId)];

        $("#name").val(data.name);
        $("#description").val(data.description);
        $("#image").val(data.image);
        $("#imageShow").attr("src",data.image);
    }
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
            formHandler.submitForm(form,editId);
        }
    });

    $("#uploadFile").change(function(){
        var name=this.files[0].name,
            url="/data/"+name;

        $("#image").val(url);
        $("#imageShow").attr("src",url);
    });
});