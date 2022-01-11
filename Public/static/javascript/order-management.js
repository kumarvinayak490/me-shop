const updateStatusFormElements=document.querySelectorAll('.order-status-action');



async function updateOrderStatus(event){

    event.preventDefault();

    const orderId=event.target.dataset.orderid.toString();
    const status=event.target.querySelector('#status').value;
    

    console.log(orderId);

    const response = await fetch('/admin/update-order-status',{
        method:'POST',
        body:JSON.stringify({orderId:orderId,
        status:status}),
        headers:{
            'Content-Type':'application/json',
        }
    });

    console.log(response.ok);

    if(!response.ok){
        console.log('error');
        return;
    }

    const data = await response.json();

    const orderStatusElement=event.target.parentElement.parentElement.querySelector('.order-status');

    orderStatusElement.textContent=data.status;

}


updateStatusFormElements.forEach((formElement)=>{

    formElement.addEventListener('submit',updateOrderStatus)
})



