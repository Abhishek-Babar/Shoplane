$(document).ready(function () {
    $("#carasol").slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    })
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function (response) {
        for (let i = 0; i < response.length; i++) {
            const card = $("<div>").addClass("card");
            card.click(function () {
                window.location.assign(`./details.html?p=${response[i].id}`)
            })
            const image = $("<img>").attr("src", response[i].preview);
            const product = $("<h4>").addClass("product").html(response[i].name);
            const brand = $("<h5>").addClass("brand").html(response[i].brand);
            const price = $("<span>").addClass("price").html(`Rs ${response[i].price}`);
            const div = $("<div>").addClass("details").append(product, brand, price)
            card.append(image, div);
            if (response[i].isAccessory === false) {
                $("#clothing").append(card)
            } else {
                $("#accessories").append(card)
            }
        }
    })
    const cartCount = JSON.parse(localStorage.getItem("cart-count"));
    if (cartCount) {
        $("#cart-count").css("display", "flex").html(cartCount);
    }

})
