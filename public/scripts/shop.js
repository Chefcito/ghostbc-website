window.addEventListener('load', function() {
    var goToMyCart = document.querySelector(".goToMyCartButton");
    goToMyCart.addEventListener('click', function(){
        window.location.href = "/myCart";
    });
    
    var product = document.querySelectorAll('.ghostMerch__productsContainer__item');

    product.forEach(function(element) {
        element.addEventListener('click', function(){
            console.log("hehe boi");
            addToCart(element.getAttribute('data-name'));
        });
    });
    
    function addToCart(name) {
        fetch(`/api/addItemToCart`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: `name=${name}`,
        }).then(function(response){
            return response.text();
        }).catch(function(error) {
            console.error(error);
        }).then(function(message) {
            console.log(message);
        });
    }
});