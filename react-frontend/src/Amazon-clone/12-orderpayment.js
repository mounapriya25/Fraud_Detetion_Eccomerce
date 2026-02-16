import {cart1,updatecart} from './10-cart.js'
import { products } from './products.js';
import { dvoption } from './11-delivery.js';
import {productdata} from "./12-ordersumary.js";




let match
export function payment(){
    let price=0
    let Shipping=0
    let doption
    
    cart1.forEach((item)=> {
       let cid=item.productid
        products.forEach((p)=>{
            if (p.id===cid){
                match=p
            }
        })
        
        price+=item.quantity*((match.priceCents/100))
        doption= dvoption(item.deliveryid)
        Shipping += ((Math.round(doption.price)/100))
        
         
    });
    console.log(price.toFixed(2),Shipping)
    let taxbef=Shipping+price
    let taxc=taxbef*0.1
    let total=taxbef+taxc
    
    let  orhtml=`     
            <div>
                <center><h3>Order Summary</h3></center>
                <div class="fl js-pr">$${price.toFixed(2)}</div>
                <p>Items (<span class="js-item">${updatecart()}</span>):</p>
                
                <div class="fl">$${Shipping.toFixed(2)}</div>
                <p>Shipping & handling</p>
                
                <div class="fl">${taxbef.toFixed(2)}</div>
                <p>Total before tax:</p>
                
                <div class="fl">${taxc.toFixed(2)}</div>
                <p>Estimated tax (10%):</p>
                
                <hr>
                <div class="order" >
                <div class="fl" style="color:rgb(113, 7, 7);">$${total.toFixed(2)}</div>
                <p>Order total:</p>
                
                </div>

                <button >Place your order</button>
            </div>`;
            
 document.querySelector('.js-order').innerHTML=orhtml

 
 
}

export default payment