$(document).ready(function(){
    var treeHandler=new ZYTreeHandler({
        newDefaultName:"新结构",
        keyName:"category"
    });

    $.fn.zTree.init($("#zyTree"), treeHandler.getSettings(),treeHandler.getNodes());

});
