import axios from "axios";
import Noty from "noty";
let addtoCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelectorAll("#cartCounter");
function updateCart(pizza) {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      console.log(res);
      cartCounter.innertext = res.data.totalQty;
      new Noty({
        type: "success",
        timeout: 1000,
        progressBar: false,
        text: "Item added to cart",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "failure",
        timeout: 1000,
        progressBar: false,
        text: "Item added to cart",
      }).show();
    });
}
addtoCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    /*  let pizza = btn.dataset.pizza;
    console.log(pizza);*/
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});
