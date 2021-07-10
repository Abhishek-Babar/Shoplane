$(document).ready(function () {
    const search = window.location.search;
    const id = search.split("=")[1];
    const cartCount =  JSON.parse(localStorage.getItem("cart-count"));
        if(cartCount) {
       $("#cart-count").css("display", "flex").html(cartCount);
      }
    $.get(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`, function (response) {
        console.log(response);
        const previewImg = $("<img>").attr("src", response.preview).addClass("preview-img");
        $("#preview").append(previewImg);
        $("#heading").html(response.name);
        $("#brand").html(response.brand);
        $("#price").html(response.price);
        for (let i = 0; i < response.photos.length; i++) {
            const thumbnail = $("<img>").attr("src", response.photos[i]).addClass("img-thumbnail");
            thumbnail.click(function () {
                $(".img-thumbnail").removeClass("selected");
                thumbnail.addClass("selected");
                previewImg.attr("src", thumbnail.attr("src"));
            })
            $("#photos").append(thumbnail);
        }
        $(".img-thumbnail:first-of-type").addClass("selected");
      
    })
    $("#add-to-cart").click(function () {
        $.get(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`, function(response){
        const order = JSON.parse(localStorage.getItem("order")) === null ? [] : JSON.parse(localStorage.getItem("order"));
        let cartCount = JSON.parse(localStorage.getItem('cart-count')) === null ? 0 : JSON.parse(localStorage.getItem("cart-count"));  
        if(order.some(item => item.id == response.id) === true){
                const orderIndex = order.findIndex(obj => obj.id === response.id);
                order[orderIndex].count += 1;
            } else {
                order.push({
                    id: response.id,
                    product: response.name,
                    image: response.preview,
                    price: response.price,
                    count: 1
                })
            }
        cartCount += 1;
        localStorage.setItem("cart-count", JSON.stringify(cartCount));
        localStorage.setItem("order",JSON.stringify(order));
       $("#cart-count").css("display", "flex").html(cartCount);
    })
    
})
        
})
