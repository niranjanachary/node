$(document).ready(function(){
    function ajaxLoad(args){
        var data = args.data;
        if(args.method)
            var method = args.method;
        else
            var method = 'POST';
        $.ajax({
            type: method,
            url: '/'+args.url,
            data: data,
            dataType: 'json'
        })
        .done(function(data){
            $('h1').html(data.quote);
        });

    }
    $("body").on('click', function(e){
        // alert('testing');
    });
});