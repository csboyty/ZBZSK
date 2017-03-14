function ZYTableHandler(params) {
    this.keyName=params.keyName;
    this.data=JSON.parse(localStorage.getItem(params.keyName));
    this.ownTable = params.ownTable(this.data);
}
ZYTableHandler.prototype.tableRedraw = function () {
    this.ownTable.fnSettings()._iDisplayStart = 0;
    this.ownTable.fnDraw();
};
ZYTableHandler.prototype.delete = function (id) {
    var index=config.findInArray(this.data,"id",id);

    if(index!=-1){
        this.data.splice(index,1);
    }
    localStorage.setItem(this.keyName,JSON.stringify(this.data));
    this.ownTable.fnDeleteRow(id);
    Materialize.toast(config.messages.optSuccess, 4000);
};
