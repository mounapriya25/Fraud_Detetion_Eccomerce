/*let products=[
    {
        image:'adults-plain-cotton-tshirt-2-pack-teal',
        name:'Adults Plain Cotton Tshirt-2-pack-teal',
        rating:{
            count:10,
            star:40
        },
        cost:'$10',
    },
    {
        image:'athletic-cotton-socks-6-pairs',
        name:'athletic-cotton-socks-6-pairs',
        rating:{
            count:1,
            stars:50
        },
        cost:'$90',
    },
    {
        image:'athletic-cotton-socks-6-pairs',
        name:'athletic-cotton-socks-6-pairs',
        rating:{
            count:1,
            stars:50
        },
        cost:'$90',
    },
    {
        image:'athletic-cotton-socks-6-pairs',
        name:'athletic-cotton-socks-6-pairs',
        rating:{
            count:1,
            stars:50
        },
        cost:'$90',
    },{
        image:'adults-plain-cotton-tshirt-2-pack-teal',
        name:'Adults Plain Cotton Tshirt-2-pack-teal',
        rating:{
            count:10,
            star:40
        },
        cost:'$10',
    },
    {
        image:'adults-plain-cotton-tshirt-2-pack-teal',
        name:'Adults Plain Cotton Tshirt-2-pack-teal',
        rating:{
            count:10,
            star:40
        },
        cost:'$10',
    },
    
    ]*/

import {addcart,updatecart} from './10-cart.js'
import { products } from './products2.js';
// dot represent same folder
let i = 0;
let phtml = ''
products.forEach((i) => {

    phtml += `<div class="main-fl">
                    <div class="cont">
                    <img  class="img"  src="javascript-amazon-project-main/${i.image}" width="90%" height="90%">
                 </div>
                <p class="name">${i.name}</p>
                <p class="star">  <img src="javascript-amazon-project-main/images/ratings/rating-${i.rating.stars * 10}.png" width="70px" height="17px"><span style="display:inline-block; text-indent: 60%; color: blue;">${i.rating.count}</span></p>
                <p>$ ${i.priceCents / 100}</p>
                <form >
                       <select  class="select js-select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        </select>
                </form>
                <button  class="add js-add" data-productid="${i.id}">Add to Cart</button>

            </div>
          `
});

document.querySelector('.js').innerHTML = phtml;

document.querySelectorAll('.js-add').forEach((add) => {
    
    add.addEventListener('click', () => {
        let pid = add.dataset.productid;   
        let select = document.querySelector('.js-select')
        let q=Number(select.value)
        addcart(pid,q)
        let cqt=updatecart()
        document.querySelector('.js-cart').innerHTML=cqt
        
    })
    
        
})

