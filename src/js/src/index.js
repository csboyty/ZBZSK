window.onload=function(){

    //init brand data
    if(!localStorage.getItem("brand")){
        localStorage.setItem("brand",JSON.stringify(config.initData.brand));
    }

    if(!localStorage.getItem("color")){
        localStorage.setItem("color",JSON.stringify(config.initData.color));
    }

    if(!localStorage.getItem("texture")){
        localStorage.setItem("texture",JSON.stringify(config.initData.texture));
    }

    if(!localStorage.getItem("category")){
        localStorage.setItem("category",JSON.stringify(config.initData.category));
    }

    if(!localStorage.getItem("mgr")){
        localStorage.setItem("mgr",JSON.stringify(config.initData.mgr));
    }
};
