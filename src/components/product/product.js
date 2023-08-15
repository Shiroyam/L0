import { checkbox, counter } from "../../ui";
import "./product.scss";

class Product {
  render(products) {
    products
      .filter(({ availability }) => availability)
      .map((data) => {
        document
          .querySelector(".product-wrapper")
          .insertAdjacentHTML("beforeend", this.template(data));
      });

    products
      .filter(({ availability }) => !availability)
      .map((data) => {
        document
          .querySelector(".product-wrapper-soldout")
          .insertAdjacentHTML("beforeend", this.template(data));
      });
  }

  // логика удаление и лайк
  crud(id) {
    counter.onRemove(`#product-${id}`, `#remove-${id}`);
    counter.onLike(`#like-${id}`);

    if (document.querySelector(`#btn-count-${id}`)) {
      counter.onIncrement(`#btn-count-${id}`, `#btn-increment-${id}`);
      counter.onDecrement(`#btn-count-${id}`, `#btn-decrement-${id}`);
    }
  }

  // логика для выбора всех чекбоксов
  checkboxAll(products) {
    const checkboxMain = document.querySelector("#checkbox-main");

    checkboxMain.addEventListener("change", () => {
      products
        .filter(({ availability }) => availability)
        .forEach(({ id }) => {
          if (checkboxMain.checked) {
            document.querySelector(`#checkbox-${id}`).checked = true;
          } else {
            document.querySelector(`#checkbox-${id}`).checked = false;
          }
        });
    });
  }

  // если блок .product__price-total слишком длинный, то уменьшаем font-size
  fontResize() {
    document.querySelectorAll(".product__price-total").forEach((value) => {
      if (value.offsetWidth > 100) {
        value.style.fontSize = "16px";
      }
    });
  }

  template(data) {
    return `
      <li>
      <article id="product-${data.id}" class="product ${
        data.availability ? `` : `product--soldout`
      }">
      
      ${data.availability ? checkbox.template(data.id) : ``}
    
      <img class="product__img" src=${data.img} />
    
      <div class="product__text">
        <h2 class="product__text-title">${data.title}</h2>
        <div class="product__text-description">
          ${data.color ? `<span>Цвет: ${data.color}</span>` : ``}
          ${data.size ? `<span>Размер: ${data.size}</span>` : ``}
        </div>
        <div class="product__text-company">
          <div>${data.IP}</div>
          <div>${data.OOO} <img src="/svg/info.svg"></div>
        </div>
      </div>
    
      ${counter.template(1, data.count, data.id, data.availability)}
    
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
  }
}

export const product = new Product();
