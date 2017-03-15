$(document).ready(function(){
    var editId;
    if(location.search){
        editId=location.search.substr(1);
        var data=JSON.parse(localStorage.getItem("brand"));
        data=data[config.findInArray(data,"id",editId)];

        $("#name").val(data.name);
    }

    var formHandler=new ZYFormHandler({
        redirectUrl:"/pages/texture/texture.html",
        keyName:"texture"
    });
    $("#myForm").validate({
        ignore:[],
        rules:{
            name:{
                required:true,
                maxlength:32
            }
        },
        messages:{
            name:{
                required:config.validErrors.required,
                maxlength:config.validErrors.maxLength.replace("${max}",32)
            }
        },
        submitHandler:function(form) {
            formHandler.submitForm(form,editId);
        }
    });
});