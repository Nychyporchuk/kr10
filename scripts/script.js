$(document).ready(function () {
    const productName = $('#product_name');
    const name = $('#name');
    const phone = $('#phone');
    const loader = $('.loader');
    const borderColor = $('.order-form-input');


    $('#burger').click(function () {
        $('#menu').toggleClass('open');
    });

    $('#menu').on('click', '*', function () {
        $('#menu').removeClass('open');
    });

    $(".main-menu-cart-button").click(function () {
        let productNameText = $(this).closest(".main-menu-cart").find(".main-menu-cart-title").text();
        productName.val(productNameText);
    });
    function setBorderProperties(value) {

        if (value === false) {
            borderColor.css('border-color', '');
            borderColor.css('margin-bottom', '');
        } else if (value === true) {
            borderColor.css('border-color', 'red');
            borderColor.css('margin-bottom', '35px');
        }
    }
    $('#submit').click(function () {
        setBorderProperties(false);

        $('.error-input').hide();

        let hasError = false;

        if (!name.val()) {
            name.next().show();
            setBorderProperties(true);
            hasError = true;
        }
        if (!productName.val()) {
            productName.next().show();
            setBorderProperties(true);
            hasError = true;
        }
        if (!phone.val()) {
            phone.next().show();
            setBorderProperties(true);
            hasError = true;
        }

        if (hasError) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'http://testologia.ru/checkout',
            data: {name: name.val(), productName: productName.val(), phone: phone.val()}
        })
            .done(function (response) {
                loader.hide();

                if (response.success) {
                    $('.order').hide();
                    $('.thank-you').css('display', 'flex');
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            });
        loader.css('display', 'flex');
    });
});
