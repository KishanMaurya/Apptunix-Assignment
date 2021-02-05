$(document).on('change','.check', function(e){
    e.preventDefault()
    let id=$(this).attr('data')
    console.log(id)
    $('#UpdateModel').modal('show');
    $.ajax({
        type: "PATCH",
        url: "/api/todo/check/"+id,
        dataType: "json",
        data: JSON.stringify({id:id}),
        contentType: 'application/json',
        cache: false,
        timeout: 5000,
        complete: function() {
          console.log('process complete');
        },
        dataType: "json",
        success: function (response,status,xhr) {
            console.log(response)
        },
        error: function(xhr,status,error) {
            console.log('process error',error);
        },
    });
})

//reloadfucntion 

$(document).on('click','.close', function(e){
    window.location.reload();
})