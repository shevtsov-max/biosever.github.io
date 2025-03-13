

$(function(){

    var start_price = $('#start_price').val();
    var koll = $('#koll');
    var bonus = $('.bonus');

    $.fn.updatePrice = function(){
        var dop = 0;
        $.each($( "input:checked" ),function(key, value) {
            dop += $(this).attr('data-system')?parseInt($(this).attr('data-system')):0;
        });
        $(koll).closest('.number-plus-minus').children('.desc').css('display', 'none').closest('.number-plus-minus').children('#desc'+$(koll).val()).css('display', 'block');

        var contract = parseFloat((1 - parseInt($(koll).val()) * 0.05 + 0.05) * parseInt($(koll).val())).toFixed(2);

        $(this).find('.price').text(start_price*contract+dop).val(start_price*contract+dop);
        return this;
    };



});


jQuery(document).ready(function () {

    $('.number-plus-minus').find('.icon-left-open-big').on('click', function () {
        var input = $(this).parent().children('input[type="number"]');
        if(parseInt($(input).attr('min'))<parseInt($(input).val()))
            $(input).val(parseInt($(input).val())-1);
        $(input).closest('form').updatePrice();
    }).parent().children('.icon-right-open-big').on('click', function () {
        var input = $(this).parent().children('input[type="number"]');
        if(parseInt($(input).attr('max'))>parseInt($(input).val()))
            $(input).val(parseInt($(input).val())+1);
        $(input).closest('form').updatePrice();
    }).closest('form').updatePrice()
        .submit(function () {
            var obj = this;

            $(obj).find('.result').html('<div id="info" class="message"><span>Ожидайте.</span> Ваш заказ отправляется.</div>');
            $.post('//biosever.ru/send/zakaz', $(obj).serializeArray(),
                function (data) {
                    $(obj).find('.result').html('<div id="success" class="message"><span>Готово!</span> Скоро с вами свяжется наш менеджер.</div>');
                }).fail(function() {
                    $(obj).find('.result').html('<div id="error" class="message"><span>Ошибка!</span> Ведуться технические работы на сайте.</div>');
            });
            return false;
        })
        .change(function (){$(this).updatePrice();}).find('[name="phone"]').mask("+7 (999) 999-9999");

    
    
    
});
