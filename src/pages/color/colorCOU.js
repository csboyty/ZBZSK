$(document).ready(function(){
    var editId;
    if(location.search){
        editId=location.search.substr(1);
        var data=JSON.parse(localStorage.getItem("brand"));
        data=data[config.findInArray(data,"id",editId)];

        $("#name").val(data.name);
        $("#color").val(data.color);
    }
    var formHandler=new ZYFormHandler({
        redirectUrl:"/pages/color/color.html",
        keyName:"color"
    });
    $("#myForm").validate({
        ignore:[],
        rules:{
            name:{
                required:true,
                maxlength:32
            },
            value:{
                required:true
            }
        },
        messages:{
            name:{
                required:config.validErrors.required,
                maxlength:config.validErrors.maxLength.replace("${max}",32)
            },
            value:{
                required:config.validErrors.required
            }
        },
        submitHandler:function(form) {
            formHandler.submitForm(form,editId);
        }
    });
});