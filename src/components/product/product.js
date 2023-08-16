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

  eventListener(data) {
    const increment = document.querySelector(`#btn-increment-${data.id}`);
    const decrement = document.querySelector(`#btn-decrement-${data.id}`);
    const remove = document.querySelector(`#remove-${data.id}`);
    const like = document.querySelector(`#like-${data.id}`);
    const checkbox = document.querySelector(`#checkbox-${data.id}`);
    const checkboxAll = document.querySelector(`#checkbox-main`);

    if (increment) {
      increment.addEventListener("click", () => {
        counter.onIncrement(`#btn-count-${data.id}`);

        this.increasePrice(data.id, data.price, data.discount);
      });
    }

    if (decrement) {
      decrement.addEventListener("click", () => {
        counter.onDecrement(`#btn-count-${data.id}`);

        this.reducePrice(data.id, data.price, data.discount);
      });
    }

    if (checkbox) {
      checkbox.addEventListener("change", () => {
        this.checkboxChange(data.id);

        if (checkbox.checked) {
          this.increasePrice(data.id, data.price, data.discount);
        } else {
          this.reducePrice(data.id, data.price, data.discount);
        }
      });

      checkboxAll.addEventListener("change", () => {
        this.checkboxAll(data.id, checkboxAll.checked);

        checkbox.dispatchEvent(new Event("change"));
      });
    }

    like.addEventListener("click", () => {
      counter.onLike(like);
    });

    remove.addEventListener("click", () => {
      if (checkbox.checked) {
        this.reducePrice(data.id, data.price, data.discount);
      }

      counter.onRemove(`#product-${data.id}`);
    });
  }

  increasePrice(id, price, discount) {
    const priceProduct = document.querySelector(`#product-discount-${id}`);
    const discountProduct = document.querySelector(`#product-price-${id}`);
    const priceTotal = document.querySelectorAll(`#total-price`);
    const discountTotal = document.querySelector(`#total-discount`);

    priceProduct.innerHTML = Number(priceProduct.innerHTML) + Number(discount);

    discountProduct.innerHTML =
      Number(discountProduct.innerHTML) + Number(price);

    priceTotal.forEach((value) => {
      value.innerHTML = Number(value.innerHTML) + Number(discount);
    });

    discountTotal.innerHTML =
      Number(discountTotal.innerHTML) + (Number(price) - Number(discount));
  }

  reducePrice(id, price, discount) {
    const priceProduct = document.querySelector(`#product-discount-${id}`);
    const discountProduct = document.querySelector(`#product-price-${id}`);
    const priceTotal = document.querySelectorAll(`#total-price`);
    const discountTotal = document.querySelector(`#total-discount`);

    if (Number(priceProduct.innerHTML) > 0) {
      priceProduct.innerHTML =
        Number(priceProduct.innerHTML) - Number(discount);

      discountProduct.innerHTML =
        Number(discountProduct.innerHTML) - Number(price);

      priceTotal.forEach((value) => {
        value.innerHTML = Number(value.innerHTML) - discount;
      });

      discountTotal.innerHTML =
        Number(discountTotal.innerHTML) - (Number(price) - Number(discount));
    }
  }

  removePriceTotal(id) {
    const priceTotal = document.querySelectorAll(`#total-price`);
    const discountTotal = document.querySelector(`#total-discount`);
    const priceProduct = document.querySelector(`#product-discount-${id}`);
    const discountProduct = document.querySelector(`#product-price-${id}`);

    priceTotal.forEach((value) => {
      value.innerHTML =
        Number(value.innerHTML) - Number(priceProduct.innerHTML);
    });

    discountTotal.innerHTML =
      Number(discountTotal.innerHTML) -
      (Number(discountProduct.innerHTML) - Number(priceProduct.innerHTML));
  }

  // логика для выбора всех чекбоксов
  checkboxAll(id, checked) {
    const checkbox = document.querySelector(`#checkbox-${id}`);

    checked ? (checkbox.checked = true) : (checkbox.checked = false);
  }

  checkboxChange(id) {
    const checkbox = document.querySelector(`#checkbox-${id}`);

    checkbox.checked ? (checkbox.checked = true) : (checkbox.checked = false);
  }

  // если блок .product__price-total слишком длинный, то уменьшаем font-size
  fontResize() {
    document.querySelectorAll(".product__price-total").forEach((value) => {
      if (value.offsetWidth > 85) {
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
      
      ${data.availability ? checkbox.template(data.id, "checkbox-product") : ``}
    
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
              <div>
                <span id="product-discount-${data.id}" class="product__price-total">${data.discount}</span>
                <span class="product__price-currency">сом</span>
              </div>
              <div class="product-discount">
                <span id="product-price-${data.id}" class="number">${data.price}</span>
                <span class="currency">сом</span>
              </div>
            </div>`
          : ``
      }
      </article>
      </li>
    `;
  }
}

export const product = new Product();
