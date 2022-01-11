const updateCartBtns = document.querySelectorAll('#cart-btn');
const cartItemQtyElement = document.getElementById("cart-quantity");
const grandTotalElement = document.getElementById("grand-total");


async function updateItemQuantity(event){

    const pid=event.target.dataset.pid;
    const quantity=event.target.previousElementSibling.value;

    const response = await fetch('/cart/update-item',{
        method:'POST',
        body:JSON.stringify({pid:pid,quantity:quantity}),
        headers:{
            'Content-Type':'application/json',
        }
    });

    if(!response.ok){
        console.log('error');
    }

    const data = await response.json();

    console.log(data);

    const containerElement=event.target.parentElement.parentElement;

    const itemPriceElement=containerElement.querySelector('#item-total');

    if (data.updatedItemPrice < 0 || data.updatedItemPrice === 0) {
      containerElement.remove();
      const numberofBtns = document.querySelectorAll("#cart-btn").length;

      if( numberofBtns ===0 ){
          window.location.reload();
      }
      
    } else {
      itemPriceElement.textContent = data.updatedItemPrice;
    }

   
    cartItemQtyElement.textContent=data.totalQuantity;
    grandTotalElement.textContent=data.totalPrice;

}


updateCartBtns.forEach((btn)=>{

    btn.addEventListener('click',updateItemQuantity);

});