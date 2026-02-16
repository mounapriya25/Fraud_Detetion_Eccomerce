 /* export let cart1=JSON.parse(localStorage.getItem('cart1'))
  
  if(!cart1){
  cart1=[{
    productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:1,
    deliveryid:'1'
  },
  {
    productid: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryid:'3'
  }]
}


function save(){
  localStorage.setItem('cart1',JSON.stringify(cart1))
}
  export function addcart(pid,q){ 
    let match;
    cart1.forEach((i) => {
      if (i.productid === pid) {
          match = i
      }
  
      })
      console.log(q)
      if (match) {
           match.quantity +=q;
      }
      else {
          cart1.push({
              productid: pid,
              quantity: q,
              deliveryid:'1'
          })
      }
  }
      save()
 export function updatecart(){
   let  cartqt =0
    cart1.forEach((i) => {
            cartqt += i.quantity
    })
    console.log(cartqt)
    
    console.log(cart1)
    save()
    return cartqt
  }



export function deleteprd(productid){
  let newcart= [];
  cart1.forEach((i)=>{
    if(productid!==i.productid){
      newcart.push(i)
    }
  })
  cart1=newcart
  save()
}
export function price(){
  cart1.forEach((p=>{
     price += cart.c
  }))
}

export function updatedeliveryopt(prid,did){
  let match;
    cart1.forEach((i) => {
      if (i.productid === prid) {
          match = i
      }
    })//prid delongs to cart we acess cart element through product
    match.deliveryid=did;
    save()
}*/
// Load cart from localStorage or initialize empty
export let cart1 = JSON.parse(localStorage.getItem("cart1")) || [];

// Save cart to localStorage
function save() {
  localStorage.setItem("cart1", JSON.stringify(cart1));
}

// Add product to cart
export function addcart(productid, quantity = 1) {
  const item = cart1.find((i) => i.productid === productid);

  if (item) {
    item.quantity += quantity;
  } else {
    cart1.push({
      productid,
      quantity,
      deliveryid: "1",
    });
  }

  save();
}

// Get total cart quantity (for cart badge)
export function updatecart() {
  const totalQuantity = cart1.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  save();
  return totalQuantity;
}

// Remove a product completely
export function deleteprd(productid) {
  cart1 = cart1.filter(
    (item) => item.productid !== productid
  );
  save();
}

// Get full cart (useful in React pages)
export function getCart() {
  return cart1;
}

// Update delivery option
export function updatedeliveryopt(productid, deliveryid) {
  const item = cart1.find(
    (i) => i.productid === productid
  );

  if (item) {
    item.deliveryid = deliveryid;
    save();
  }
}

// Calculate total price (₹ or $)
export function getTotalPrice(products) {
  let total = 0;

  cart1.forEach((item) => {
    const product = products.find(
      (p) => p.id === item.productid
    );

    if (product) {
      total += product.priceCents * item.quantity;
    }
  });

  return total;
}
