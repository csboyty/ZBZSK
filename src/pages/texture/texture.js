$(document).ready(function(){
    var treeHandler=new ZYTreeHandler({
        newDefaultName:"新颜色",
        keyName:"texture"
    });

    $.fn.zTree.init($("#zyTree"), treeHandler.getSettings(),treeHandler.getNodes());

});
