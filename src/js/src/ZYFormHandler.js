function ZYFormHandler(params){
    this.keyName=params.keyName;
    this.redirectUrl=params.redirectUrl;
    this.data=JSON.parse(localStorage.getItem(this.keyName));
}
ZYFormHandler.prototype.submitForm=function(form){
    var dataArray=$(form).serializeArray(),
        obj={},me=this;

    for(var i=0,len=dataArray.length;i<len;i++){
        obj[dataArray[i].name]=dataArray[i].value;
    }

    obj.opt="";
    obj.id=parseInt(this.data[this.data.length-1].id)+1;

    this.data.push(obj);
    localStorage.setItem(this.keyName,JSON.stringify(this.data));

    setTimeout(function(){
        location.href=me.redirectUrl;
    },3000);

    Materialize.toast(config.messages.optSuccRedirect, 4000);
};