$(document).ready(function(){
    $('.usun-artykul').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        console.log(id);
        $.ajax({
            type: 'DELETE',
            url: '/artykuly/'+ id,
            success: function(response){
                alert('Usunięto artykuł: ' + id);
                window.location.href='/';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});