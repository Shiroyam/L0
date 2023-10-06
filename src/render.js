import { ROOT_MODAL } from "./constants";
import { products, address, payment } from "./data.json";
import {
  deliveryModal,
  form,
  paymentModal,
  product,
  accordion,
} from "./components";
import { checkbox, button, counter } from "./ui";

// рендер темплейтов: accordion, products
(function render() {
  // accordion для cart
  accordion.render();

  // products в корзине
  product.render(products);

  // input в form
  form.render();

  //checkbox
  document
    .querySelector(".payment-description")
    .insertAdjacentHTML("afterbegin", checkbox.template("payment"));

  //button
  document
    .querySelector(".total__payment")
    .insertAdjacentHTML(
      "afterend",
      button.template("total", "Оплатить 16000 cом"),
    );

  //modal
  paymentModal.render(payment);

  deliveryModal.render(address);
})();

accordion.openAndClose(
  ".product-wrapper",
  "#cart",
  "product-wrapper--hidden",
  "product-wrapper",
  "accordion__arrow--active",
  "#accordion-cart",
  "accordion--active",
);

accordion.openAndClose(
  ".product-wrapper-soldout",
  "#soldout",
  "product-wrapper-soldout--hidden",
  "product-wrapper-soldout",
  "accordion__arrow-soldout--active",
  "#accordion-soldout",
  "accordion--active",
);

products.forEach((data) => {
  product.eventListener(data);
});

deliveryModal.eventListener(address);

paymentModal.eventListener(payment);

form.eventListener();

// логика закрытия модалки при клике на бэкграунд
ROOT_MODAL.addEventListener("click", () => {
  ROOT_MODAL.style.display = "none";
  document.querySelector("#modal-payment").style.display = "none";
  document.querySelector("#modal-delivery").style.display = "none";
});
