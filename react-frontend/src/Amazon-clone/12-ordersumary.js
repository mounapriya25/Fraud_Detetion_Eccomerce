import {cart1,deleteprd,updatecart} from './10-cart.js';
import {products} from './products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
// dayjs is default export and one file have only one default export
//export default name(you want to export from that file)
import { delivery ,dvoption} from './11-delivery.js';
import { updatedeliveryopt } from './10-cart.js';
import payment from './12-orderpayment.js';



export function productdata(){
    let match;
    let i=0;
    let chtml=''
    cart1.forEach((i) => {
        const pid=i.productid
        products.forEach((pr)=>{
            if (pr.id===pid){
                match=pr
                
            }
        })
        let doption
        if(match)
        {
            
                let cartdelid=i.deliveryid
                doption=dvoption(cartdelid)
                chtml+=`<div class="c js-cartitem-${match.id}">
                                <h4 class="name"> Delivery date:<span class="js-topdate">${date(doption.day)}</span></h4>
                                <div class="g">
                                    <div class="cont">
                                        <img  class="img" src="javascript-amazon-project-main/${match.image}" width="200" height="250">
                                    </div>
                                    <div style="margin-left: 10px;">
                                        <p class="name">${match.name}</p>
                                        <p class="cost" data-jsprice="${(match.priceCents/100).toFixed(2)}">$ ${(match.priceCents/100).toFixed(2)}</p>
                                        <p style="font-size: large;">Quantity:<span>${i.quantity}</span> <span class="span">Update</span> <span class="span js-delete"  data-prdid="${match.id}"> Delete</span></p>
                                    </div>
                                    <div>
                                        <p class="name"> Choose a delivery option:</p>
                                        <div class="js-deliv">

                                        ${del(match,i)}
                                        </div>
                                    </div>
                                </div>
                            </div>`
        }
                
    });

           
document.querySelector('.js-cart').innerHTML=chtml
document.querySelectorAll('.js-delete').forEach((it)=>{
    it.addEventListener("click",()=>{
       
        let prid=it.dataset.prdid
        deleteprd(prid)//to update cart
        let del= document.querySelector(`.js-cartitem-${prid}`)
        del.remove()
        let qt=updatecart()
        document.querySelector('.js-qt').innerHTML=qt
        document.querySelector('.js-item').innerHTML=qt
        payment()
    })
})
/*let qt=updatecart()
document.querySelector('.js-qt').innerHTML=qt
document.querySelector('.js-item').innerHTML=qt*/


 
 function date(day){
    let today=dayjs()
    let d=today.add(day,'day')
    let dt= d.format('dddd MMMM D')
    return dt
 }
function del(match,cart1){
    let dhtml='' 
    
    delivery.forEach((d)=>{
      let ischecked=d.id===cart1.deliveryid;//gives true or false
      let price=d.price===0 ?'FREE':`$${(d.price/100).toFixed(2)}`
       dhtml +=`    <div>
                        <input  type="radio"   class="js-option" data-productid="${match.id}" data-option="${d.id}" data-day="${date(d.day)}"  name="${match.id}" 
                        ${(ischecked)?'checked':''} >
                        <label> 
                            <p class="p">${date(d.day)}</p>
                            <p  class="p1">${price} Shipping</p><br></label>
                        </label>
                        
                    </div>`
                    
    })
 return dhtml  
    
}
document.querySelectorAll('.js-option').forEach((i)=>{
   
    i.addEventListener('click',()=>{
        let {productid,option }= i.dataset
        updatedeliveryopt(productid,option)
        productdata()
        payment()
        
    })
   
})
}
productdata()
