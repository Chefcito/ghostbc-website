window.addEventListener('load', function() {
    var goToShopButton = document.querySelector(".goToShopButton");
    goToShopButton.addEventListener('click', function(){
        window.location.href = "/shop";
    });
});