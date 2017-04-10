function ZYFormHandler(params){
    this.keyName=params.keyName;
    this.redirectUrl=params.redirectUrl;
    this.data=JSON.parse(localStorage.getItem(this.keyName));
}
ZYFormHandler.prototype.submitForm=function(form,editId){
    var dataArray,
        obj={},me=this,index;

    if($.isPlainObject(form)){
        obj=form;
    }else{
        dataArray=$(form).serializeArray();
        for(var i=0,len=dataArray.length;i<len;i++){
            obj[dataArray[i].name]=dataArray[i].value;
        }
    }



    obj.opt="";

    if(editId!==undefined){
        index=config.findInArray(this.data,"id",editId);
        obj.id=editId;
        this.data[index]=obj;
    }else{
        obj.id=parseInt(this.data[this.data.length-1].id)+1;
        this.data.push(obj);
    }

    localStorage.setItem(this.keyName,JSON.stringify(this.data));

    setTimeout(function(){
        location.href=me.redirectUrl;
    },3000);

    Materialize.toast(config.messages.optSuccRedirect, 4000);
};
ZYFormHandler.prototype.remove=function(editId){
    if(!confirm(config.messages.confirmDelete)){
        return ;
    }
    var me=this;
    var index=config.findInArray(this.data,"id",editId);

    this.data.splice(index,1);

    localStorage.setItem(this.keyName,JSON.stringify(this.data));

    setTimeout(function(){
        location.href=me.redirectUrl;
    },3000);

    Materialize.toast(config.messages.optSuccRedirect, 4000);
};