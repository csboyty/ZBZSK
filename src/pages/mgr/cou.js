$(document).ready(function(){
    $('ul.tabs').tabs();

    $('#cutImageModal').modal();
    $("#previewModal").modal();

    $("#cutImage").click(function(){
        $('#cutImageModal').modal('open');
    });

    $("#previewBtn").click(function(){
        $("#previewModal").modal("open");
    });
});

