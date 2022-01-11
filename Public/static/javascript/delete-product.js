const deleteProductBtns=document.querySelectorAll('.products-section button');


async function deleteProduct(event){

    const pid = event.target.dataset.pid;

    console.log(pid);

    const response = await fetch(`/admin/delete/${pid}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    });

    if(!response.ok){
        console.log('error');
        return;
    }


    event.target.parentNode.parentNode.remove();

}


deleteProductBtns.forEach((btn)=>{

    btn.addEventListener('click',deleteProduct);


});


