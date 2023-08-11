import { products } from "./data.json";
import { product, counter, accordion } from "./template";

// рендер темплейтов: accordion, products
(function render() {
  // accordion для cart
  const cart = accordion.template(accordion.cartContent, "cart");
  document.querySelector(".cart").insertAdjacentHTML("afterend", cart);

  // accordion для раздела soldout
  const soldout = accordion.template(accordion.soldoutContent, "soldout");
  document
    .querySelector(".product__wrapper")
    .insertAdjacentHTML("afterend", soldout);

  // products в корзине
  products
    .filter(({ availability }) => availability)
    .map((data) => {
      const element = product.template(data);

      document
        .querySelector(".product__wrapper")
        .insertAdjacentHTML("beforeend", element);

      counter.onRemove(`#product-${data.id}`, `#remove-${data.id}`);
      counter.onLike(`#like-${data.id}`);
      counter.onIncrement(`#btn-count-${data.id}`, `#btn-increment-${data.id}`);
      counter.onDecrement(`#btn-count-${data.id}`, `#btn-decrement-${data.id}`);
    });

  // products в soldout
  products
    .filter(({ availability }) => !availability)
    .map((data) => {
      const element = product.template(data);

      document
        .querySelector(".product__wrapper-soldout")
        .insertAdjacentHTML("beforeend", element);

      counter.onRemove(`#product-${data.id}`, `#remove-${data.id}`);
      counter.onLike(`#like-${data.id}`);
    });
})();

// accordion для cart
const arrowProducts = document.querySelector("#cart");
const productsElement = document.querySelector(".product__wrapper");
const accordionElement = document.querySelector(".accordion");

accordion.accordion(
  productsElement,
  arrowProducts,
  "product__wrapper--hidden",
  "product__wrapper",
  "accordion__arrow--active",
  accordionElement,
  "accordion--active",
);

// accordion для soldout
const arrowProductsSoldout = document.querySelector("#soldout");
const productsSoldout = document.querySelector(".product__wrapper-soldout");

accordion.accordion(
  productsSoldout,
  arrowProductsSoldout,
  "product__wrapper-soldout--hidden",
  "product__wrapper-soldout",
  "accordion__arrow-soldout--active",
);

// логика для выбора всех чекбоксов
const checkboxMain = document.querySelector("#checkbox-main");
const checkboxAll = document.querySelectorAll(".product__checkbox-input");

checkboxMain.addEventListener("change", () => {
  checkboxAll.forEach((value) => {
    if (checkboxMain.checked) {
      value.checked = true;
    } else {
      value.checked = false;
    }
  });
});

// если блок .product__price-total слишком длинный, то уменьшаем font-size
const block = document.querySelectorAll(".product__price-total");

block.forEach((value) => {
  if (value.offsetWidth > 100) {
    value.style.fontSize = "16px";
  }
});
