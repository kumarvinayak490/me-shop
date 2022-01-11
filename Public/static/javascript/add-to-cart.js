
 const addToCartBtn = document.getElementById("add-to-cart");

 const cartQuantityElement = document.getElementById("cart-quantity");

 console.log(cartQuantityElement);


async function addToCartRequest(){

    const pid= addToCartBtn.dataset.pid;

    console.log(pid);

    const response = await fetch("/add-item-to-cart",{
        method:'POST',
        body:JSON.stringify({pid:pid}),
        headers:{
            'Content-Type':'application/json',
        }
    });

    if(!response.ok){
        console.log(JSON.stringify({pid:pid}));
        console.log(response);
    }

    const data = await response.json();

    cartQuantityElement.textContent = data.totalQuantity;


}


addToCartBtn.addEventListener("click", addToCartRequest )