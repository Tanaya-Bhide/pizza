/*import axios from "axios";
let addtoCart = document.querySelectorAll(".add-to-Cart");
 let cartCounter = document.querySelectorAll("#cartCounter");
function updateCart(pizza) {
  axios.post("/update-cart", pizza).then((res) => {
    console.log(res);
    cartCounter.innertext = res.data.totalQty;
  });
}

addtoCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});*/
