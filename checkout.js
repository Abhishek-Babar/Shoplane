$(document).ready(function() {
    const orders = JSON.parse(localStorage.getItem("order"));
    let totalBill = 0;
    $("#total-items").html(orders.length)
    if(orders) {
         for(let order of orders) {
            const image = $("<img>").addClass("card-img").attr("src",order.image);
            const imgWrapper = $("<div>").addClass("img-wrapper").append(image);
            const productName = $("<h3>").html(order.product);
            const itemCount = $("<span>").addClass("item-count").html(order.count);
            const countWrap = $("<p>").html("x ").append(itemCount);
            const itemAmount = $("<span>").addClass("item-amount").html(order.count * order.price);
            const amountWrap = $("<p>").html("Amount: Rs ").append(itemAmount);
            const details = $("<div>").append(productName , countWrap , amountWrap);
            const card = $("<article>").addClass("card").append(imgWrapper , details);
            $("#card-list").append(card) 
            totalBill += (order.count * order.price);
        }
        $("#total-amount").html(totalBill);
    }
    const cartCount =  JSON.parse(localStorage.getItem("cart-count"));
    if(cartCount) {
        $("#cart-count").css("display", "flex").html(cartCount);
    }
    $("#place-order").click(function() {
        $("#loader").css("display", "flex")
        setTimeout(function() {
             window.location.assign("./place-order.html");
             localStorage.removeItem("order");
             localStorage.removeItem("cart-count")
        },2500)
    })
})
