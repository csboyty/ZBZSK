$(document).ready(function() {
    var table=new ZYTableHandler({
        keyName:"brand",
        ownTable:function(data){
            var dtTable=$('#myTable').dataTable( {
                "bServerSide": false,
                "bInfo":true,
                "bLengthChange": false,
                "bFilter": false,
                "bSort":false,
                "bAutoWidth": false,
                "iDisplayLength":config.perLoadCounts.table,
                "sPaginationType":"full_numbers",
                "oLanguage": {
                    "sUrl":config.dataTable.langUrl
                },
                aaData: data,
                aoColumns: [
                    { "mDataProp": "image",
                        "fnRender":function(oObj){
                            return  "<img width='100px;' src='"+oObj.aData.image+"'>";
                        }
                    },
                    { "mDataProp": "name"},
                    { "mDataProp": "opt",
                        "fnRender":function(oObj){
                            return  '<a href="hpManage/productCOU/'+oObj.aData.id+'">编辑</a>&nbsp;&nbsp;'+
                                '<a href="'+oObj.aData.id+'" class="remove">删除</a>';
                        }
                    }
                ]
            });

            return dtTable;
        }
    });

    $("#myTable").on("click","a.remove",function(){
        if(confirm(config.messages.confirmDelete)){
            table.delete($(this).attr("href"));
        }
        return false;
    })

} );