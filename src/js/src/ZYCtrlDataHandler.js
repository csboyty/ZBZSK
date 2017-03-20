var ZYCtrlDataHandler={
    getCategoryFirstLevelItems:function(type,idFlag){
        var list=JSON.parse(localStorage.getItem("category")),
            arr=[],string;
        idFlag=idFlag||"";
        for(var i=0,len=list.length;i<len;i++){
            if(list[i].pId==="00"){
                arr.push(list[i]);
            }
        }

        if(type=="option"){
            string=juicer(config.categoryAllOptionTpl,{
                idFlag:idFlag,
                items:arr
            })
        }else if(type=="checkbox"){
            string=juicer(config.categoryAllCheckboxTpl,{
                idFlag:idFlag,
                items:arr
            })
        }

        return string;
    },
    getCategoryTreeItems:function(){
        var categoryArr=JSON.parse(localStorage.getItem("category")),
            category,items=[],itemChild,itemsCtrlArr=[],
            parentIndexMap={};

        for(var i=0,len=categoryArr.length;i<len;i++){
            category=categoryArr[i];

            if(category.id==="00"){
                continue;
            }
            if(category.isParent){
                if(category.pId!=="00"){
                    category.childs=[];
                    items.push(category);
                    parentIndexMap[category.id]=items.length-1;
                }

                continue;
            }

            if(category.isLeaf){
                items[parentIndexMap[category.pId]].childs.push(category);
            }
        }

        return juicer(config.categoryTreeTpl,{
            items:items
        })
    },
    getBrandItems:function(type,idFlag){
        var list=JSON.parse(localStorage.getItem("brand")),
            string;
        idFlag=idFlag||"";

        if(type=="option"){
            string=juicer(config.brandAllOptionTpl,{
                idFlag:idFlag,
                items:list
            })
        }else if(type=="checkbox"){
            string=juicer(config.brandAllCheckboxTpl,{
                idFlag:idFlag,
                items:list
            })
        }

        return string;
    },
    getTextureItems:function(idFlag){
        var list=JSON.parse(localStorage.getItem("texture")),
            string;
        idFlag=idFlag||"";

        string=juicer(config.textureAllCheckboxTpl,{
            idFlag:idFlag,
            items:list
        });

        return string;
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
    },
    getCutImageEl:function(sizeW,customData){
        var imageCssObj,imageString;

        imageCssObj=this.computeImageCss(sizeW,customData);
        imageCssObj.src=customData.src;
        imageCssObj.sizeW=sizeW;
        imageString=juicer(config.cutImageTpl,imageCssObj);


        return imageString;
    }

};
