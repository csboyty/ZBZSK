function ZYTableHandler(params) {
    this.keyName=params.keyName;
    this.data=JSON.parse(localStorage.getItem(params.keyName));
    this.ownTable = params.ownTable(this.data);
}
ZYTableHandler.prototype.tableRedraw = function () {
    this.ownTable.fnSettings()._iDisplayStart = 0;
    this.ownTable.fnDraw();
};
ZYTableHandler.prototype.tableSearch=function(params){
    var item,arr=[],flag=false;
    for(var i=0,len=this.data.length;i<len;i++){
        item=this.data[i];
        if(params.style){
            if(item.style.indexOf(params.style)==-1){
                continue;
            }
        }
        if(params.startDate){
            if(item.marketDate<params.startDate){
                continue;
            }
        }
        if(params.endDate){
            if(item.marketDate>params.endDate){
                continue;
            }
        }
        if(params.brand){
            if(params.brand.indexOf(item.brand)==-1){
                continue;
            }
        }
        if(params.marketType.length!=0){
            flag=params.marketType.some(function(value){
                return item.marketType==value;
            });
            if(!flag){
                continue;
            }
        }
        if(params.texture.length!=0){
            flag=params.texture.some(function(value){
                return item.texture.indexOf(value)!=-1;
            });
            if(!flag){
                continue;
            }
        }
        if(params.mainColor){
            if(item.color[0]!=params.mainColor){
                continue;
            }
        }
        if(params.assistColor1){
            if(item.color[1]!=params.assistColor1){
                continue;
            }
        }
        if(params.assistColor2){
            if(item.color[2]!=params.assistColor2){
                continue;
            }
        }

        arr.push(item);
    }

    this.ownTable.fnClearTable();
    this.ownTable.fnAddData(arr);
};
ZYTableHandler.prototype.delete = function (id) {

    if(!confirm(config.messages.confirmDelete)){
        return ;
    }

    var index=config.findInArray(this.data,"id",id);

    if(index!=-1){
        this.data.splice(index,1);
    }
    localStorage.setItem(this.keyName,JSON.stringify(this.data));
    this.ownTable.fnDeleteRow(id);
    Materialize.toast(config.messages.optSuccess, 4000);
};
