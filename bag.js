let bagitems = []

onload()

function onload() {

  itemobj();
  displaybagitem();
  showsummary();
}


function itemobj() {

  bagitems = cart.map((itemid) => {
    for (let i = 0; i < items.length; i++) {
      if (itemid == items[i].id) {
        return items[i]
      }
    }
  })

  console.log(bagitems)

}

function displaybagitem() {
  let bagcontainer = document.querySelector(".itemcollection")
  let objitems = ''
  bagitems.forEach((item) => {
    objitems += `<div class="checkoutitemdiv">
    <img class="checkout-img" src="${item.image}" alt="" />
    <div class="checkoutText">
    <div class="rating">
    ${item.rating.stars}⭐ | ${item.rating.count}
    </div>
    <div class="company-name">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    </div>
    
    <div class="price">
    <span class="current-price">$${item.current_price}</span>
    <span class="original-price">$${item.original_price}</span>
    <span class="discount">${item.discount_percentage}%</span>
    </div>

    <div class="deletediv" onclick="delpro(${item.id})">
          X
        </div>
    </div>`
  })

  bagcontainer.innerHTML = objitems
}


function delpro(item){

  //  let delitem = document.querySelector(".checkoutitemdiv")
  //  delitem.remove()
  cart = cart.filter(cartid => cartid != item)
  localStorage.setItem("cart", JSON.stringify(cart))
  if (cart.length > 0) {
    bagItem.style.visibility = "visible"
    bagItem.innerText = cart.length
}
else {
    bagItem.style.visibility = "hidden"

}
  itemobj();
  displaybagitem();
  showsummary();
  

}

function showsummary(){
  let pricecontent = document.querySelector(".paymentdiv")
  let totalitem = cart.length
  let totalprice =0
  let totaldiscount = 0
  let finalamount = 0
  let conviFee = 99

  bagitems.forEach(bagitem => {
    console.log(bagitem)

    totalprice += bagitem.original_price
   
    totaldiscount += (bagitem.original_price - bagitem.current_price)
    finalamount = totalprice - totaldiscount + conviFee


  })
  pricecontent.innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalitem}) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">${totalprice}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-${totaldiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">${conviFee}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">${finalamount}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
        </div>
  `
}
