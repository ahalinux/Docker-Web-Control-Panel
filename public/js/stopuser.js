$(function(){
    $('.stopusered').click(function(e){
        var target = $(e.target)
        var id = target.data('id')
        //var tr = $('.item-id-'+id)

        $.ajax({
            type: 'GET',
            url: '/admin/user/stopped?id='+id
        }).done(function(results){
            if(results.success === 1){
                /*if(tr.length > 0){
                    tr.remove()
                }*/
            }
        })
    })
})