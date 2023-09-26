// "use strict"

// document.addEventListener('DOMContentLoaded',function(){
//    const form = document.getElementById('form');
//    form.addEventListener('submit',forSend)

// async function forSend(e){
//    e.preventDefault();

//       let error = forValidate(form);
// }

// function forValidate(form){
//    let error = 0;
//    let formReq = document.querySelectorAll('._req')
// }
// });




function toggleDeliveryForm() {

   const deliveryMethod = document.getElementById('deliveryMethod').value;
   const deliveryFormContainer = document.getElementById('deliveryFormContainer');
   const streetContainer = document.getElementById('streetContainer');
   const houseNumberContainer = document.getElementById('houseNumberContainer');
   const apartmentNumberContainer = document.getElementById('apartmentNumberContainer');
   const pickupLocationContainer = document.getElementById('pickupLocationContainer');
   
   if (deliveryMethod === 'pickup') {
   deliveryFormContainer.style.display = 'block';
   streetContainer.style.display = 'none';
   houseNumberContainer.style.display = 'none';
   apartmentNumberContainer.style.display = 'none';
   pickupLocationContainer.style.display = 'block';
   } else if (deliveryMethod === 'home') {
   deliveryFormContainer.style.display = 'block';
   streetContainer.style.display = 'block';
   houseNumberContainer.style.display = 'block';
   apartmentNumberContainer.style.display = 'block';
   pickupLocationContainer.style.display = 'none';
   } else {
      deliveryFormContainer.style.display = 'none';
   }

}