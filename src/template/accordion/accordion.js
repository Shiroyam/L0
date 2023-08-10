import "./accordion.scss";

const cartContent = `
<div class="accordion__count">266 товаров · 2 100 569 сом</div>
<div class="accordion__checkbox">
  <input class="accordion__checkbox-input" id="checkbox-main" type="checkbox" checked/>
  <label for="checkbox-main"></label>
</div>
<div class="accordion-wrapper-all">Выбрать все</div>
`;

const soldoutContent = `<div class="accordion-wrapper-soldout">Отсутствуют · 3 товара</div>`;

const template = (content, id) => {
  return `
    <div class="accordion">
      <div class="accordion-wrapper">
      ${content}
      </div>
    
      <img id=${id} class="accordion__arrow" src="./src/icons/arrow.svg">
    </div>
  `;
};

// рендерим accordion
(function render() {
  const cart = template(cartContent, "cart");
  document.querySelector(".cart").insertAdjacentHTML("afterend", cart);

  const soldout = template(soldoutContent, "soldout");
  document
    .querySelector(".product__wrapper")
    .insertAdjacentHTML("afterend", soldout);
})();

// логика открытия и закрытия accordion
const accordion = (
  target,
  trigger,
  className,
  flag,
  classNameTrigger,
  accordion,
  classNameAccordion,
) => {
  trigger.addEventListener("click", () => {
    if (target.className === flag) {
      trigger.classList.add(classNameTrigger);
      target.classList.add(className);
      accordion ? accordion.classList.add(classNameAccordion) : null;
    } else {
      trigger.classList.remove(classNameTrigger);
      target.classList.remove(className);
      accordion ? accordion.classList.remove(classNameAccordion) : null;
    }
  });
};

// accordion для cart
const arrowProducts = document.querySelector("#cart");
const products = document.querySelector(".product__wrapper");
const accordionElement = document.querySelector(".accordion");

accordion(
  products,
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

accordion(
  productsSoldout,
  arrowProductsSoldout,
  "product__wrapper-soldout--hidden",
  "product__wrapper-soldout",
  "accordion__arrow-soldout--active",
);
