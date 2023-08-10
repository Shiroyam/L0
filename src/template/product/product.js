import { products } from "../../data.json";
import "./product.scss";

const template = (data) => {
  return `
  <li>
   <article class="product ${data.availability ? `` : `product--soldout`}">
  
   <div class="product__checkbox">
     <input class="product__checkbox-input" id="checkbox-${
       data.id
     }" type="checkbox" checked/>
     <label for="checkbox-${data.id}"></label>
   </div>
 
   <img class="product__img" src=${data.img} />
 
   <div class="product__text">
     <h2 class="product__text-title">${data.title}</h2>
     <div class="product__text-description">
       ${data.color ? `<span>Цвет: ${data.color}</span>` : ``}
       ${data.size ? `<span>Размер: ${data.size}</span>` : ``}
     </div>
     <div class="product__text-company">
       <div>${data.IP}</div>
       <div>${data.OOO} <img src="./src/icons/info.svg"></div>
     </div>
   </div>
 
   ${
     data.availability
       ? ` <div class="product__counter">
             <button class="product__counter-btn">-</button>
             <span class="product__counter-number">${data.count}</span>
             <button class="product__counter-btn product__counter-btn--active">+</button>
           </div>`
       : ``
   }
 
   ${
     data.availability
       ? `<div class="product__price">
           <div class="product__price-total">${data.discount} <span>сом</span></div>
           <div class="product__price-discount">${data.price} <span>сом</span></div>
         </div>`
       : ``
   }
   </article>
  </li>
   `;
};

// рендерим карточки продукта
(function render() {
  products
    .filter(({ availability }) => availability)
    .map((data) => {
      const element = template(data);

      document
        .querySelector(".product__wrapper")
        .insertAdjacentHTML("beforeend", element);
    });

  products
    .filter(({ availability }) => !availability)
    .map((data) => {
      const element = template(data);

      document
        .querySelector(".product__wrapper-soldout")
        .insertAdjacentHTML("beforeend", element);
    });
})();

// если блок .product__price-total слишком длинный, то уменьшаем font-size
const block = document.querySelectorAll(".product__price-total");

block.forEach((value) => {
  if (value.offsetWidth > 100) {
    value.style.fontSize = "16px";
  }
});

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
