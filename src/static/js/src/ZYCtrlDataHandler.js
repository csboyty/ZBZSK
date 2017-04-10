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
    getColorItems:function(type,idFlag){
        var list=JSON.parse(localStorage.getItem("color")),
        string;
        idFlag=idFlag||"";

        if(type=="option"){
            string=juicer(config.colorAllOptionTpl,{
                idFlag:idFlag,
                items:list
            });
        }

        return string;
    },
    /**
     * 计算实际image的尺寸和margin
     *  customData中x，y记录的是百分比
     *  boundW,boundH是裁剪时原图的大小
     *  ratio是裁剪的形状的w和h比值
     *  原理：固定高度
     *  当前裁剪框的高度是div的高度，和原始的裁剪高度的比值乘以boundH就是当前image的高度
     *  宽度的计算原理一样
     * @param showHeight
     * @param customData
     * @returns {{realW: number, realH: number, marginL: number, marginT: number}}
     */
    computeImageCss:function(showHeight,customData){
        var ratio=showHeight/customData.h,
            realW=ratio*customData.boundW,realH=ratio*customData.boundH,
            marginL=-customData.x*realW,marginT=-customData.y*realH;

        return {
            showHeight:showHeight,
            showWidth:showHeight*customData.ratio,
            realW:realW,
            realH:realH,
            marginL:marginL,
            marginT:marginT
        }
    },
    getCutImageEl:function(sizeH,customData){
        var imageCssObj,imageString;

        imageCssObj=this.computeImageCss(sizeH,customData);
        imageCssObj.src=customData.src;
        imageString=juicer(config.cutImageTpl,imageCssObj);


        return imageString;
    }

};
