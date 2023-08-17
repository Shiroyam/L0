import { checkbox, counter, tooltip } from "../../ui";
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
    const checkboxPayment = document.querySelector("#checkbox-payment");
    const btnOOO = document.querySelector(`#OOO-${data.id}`);
    const bntDiscount = document.querySelector(`#wrapper-price-${data.id}`);

    if (increment) {
      increment.addEventListener("click", () => {
        counter.onIncrement(`#btn-count-${data.id}`);
        this.increasePriceProduct(data.id, data.price, data.discount);

        if (checkbox.checked) {
          this.calculateTotalPrice();
        }
      });
    }

    if (decrement) {
      decrement.addEventListener("click", () => {
        counter.onDecrement(`#btn-count-${data.id}`);
        this.reducePriceProduct(data.id, data.price, data.discount);

        if (checkbox.checked) {
          this.calculateTotalPrice();
        }
      });
    }

    if (checkbox) {
      checkbox.addEventListener("change", () => {
        this.calculateTotalPrice();
      });

      checkboxAll.addEventListener("change", () => {
        this.selectAll(checkbox, checkboxAll.checked);

        this.calculateTotalPrice();
      });
    }

    like.addEventListener("click", () => {
      counter.onLike(like);
    });

    remove.addEventListener("click", () => {
      counter.onRemove(`#product-${data.id}`);

      this.calculateTotalPrice();
    });

    checkboxPayment.addEventListener("change", () => {
      this.selectPayment();
    });

    btnOOO.addEventListener("mouseover", () => {
      btnOOO.insertAdjacentHTML(
        "afterend",
        tooltip.template(
          data.id,
          tooltipCompany(
            data.company.title,
            data.company.orgn,
            data.company.address,
          ),
        ),
      );
    });

    btnOOO.addEventListener("mouseout", () => {
      const tooltip = document.querySelector(".tooltip");

      tooltip.remove();
    });

    if (bntDiscount) {
      const percent = Number(data.price) / 100;
      const sale = Math.floor(
        (Number(data.price) - Number(data.discount)) / percent,
      );

      bntDiscount.addEventListener("mouseover", () => {
        bntDiscount.insertAdjacentHTML(
          "beforeend",
          tooltip.template(
            data.id,
            tooltipDiscount(sale, Number(data.price) - Number(data.discount)),
          ),
        );
      });

      bntDiscount.addEventListener("mouseout", () => {
        const tooltip = document.querySelector(".tooltip");

        tooltip.remove();
      });
    }
  }

  /**
   * Убавление цены при изменении счетчика
   */
  increasePriceProduct(id, price, discount) {
    const priceProduct = document.querySelector(`#product-discount-${id}`);
    const discountProduct = document.querySelector(`#product-price-${id}`);

    priceProduct.innerHTML = Number(priceProduct.innerHTML) + Number(discount);
    discountProduct.innerHTML =
      Number(discountProduct.innerHTML) + Number(price);
  }

  /**
   * Добавление цены при изменении счетчика
   */
  reducePriceProduct(id, price, discount) {
    const priceProduct = document.querySelector(`#product-discount-${id}`);
    const discountProduct = document.querySelector(`#product-price-${id}`);

    if (Number(priceProduct.innerHTML) > 0) {
      priceProduct.innerHTML =
        Number(priceProduct.innerHTML) - Number(discount);

      discountProduct.innerHTML =
        Number(discountProduct.innerHTML) - Number(price);
    }
  }

  /**
   * Пересчет конечной цены при каждом изменении счетчика или чекбокса
   */
  calculateTotalPrice() {
    const priceTotal = document.querySelectorAll(`#total-price`);
    const discountTotal = document.querySelector(`#total-discount`);
    const btnTotal = document.querySelector("#button-total");
    const checkboxTotal = document.querySelector("#checkbox-payment");
    const checkboxes = document.querySelectorAll(".checkbox-product");
    let totalPrice = 0;
    let totalDiscount = 0;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        let id = checkbox.id.split("-").at(-1);

        const priceProduct = document.querySelector(`#product-discount-${id}`);
        totalPrice += Number(priceProduct.innerHTML);

        const discountProduct = document.querySelector(`#product-price-${id}`);
        totalDiscount +=
          Number(discountProduct.innerHTML) - Number(priceProduct.innerHTML);
      }
    });

    priceTotal.forEach((value) => {
      value.innerHTML = totalPrice;
    });

    if (checkboxTotal.checked) {
      btnTotal.innerHTML = `Оплатить ${totalPrice} cом`;
    }

    discountTotal.innerHTML = totalDiscount;
  }

  /**
   * Выбрать все чекбоксы
   */
  selectAll(checkbox, checked) {
    checked ? (checkbox.checked = true) : (checkbox.checked = false);
  }

  selectPayment() {
    const checkbox = document.querySelector("#checkbox-payment");
    const total = document.querySelector("#total-price");
    const btn = document.querySelector("#button-total");

    if (checkbox.checked) {
      btn.innerHTML = `Оплатить ${total.innerHTML} cом`;
    } else {
      btn.innerHTML = "Заказать";
    }
  }

  /**
   * Eсли блок .product__price-total слишком длинный, то уменьшаем font-size
   */
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
          <div class="company">${
            data.company.title
          } <img src="/svg/info.svg" id="OOO-${data.id}"></div>
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
              <div id="wrapper-price-${data.id}" class="product-discount">
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

const tooltipCompany = (title, ogrn, address) => {
  return `
    <div class="tooltip__content">
      <h6 class="tooltip__content-title">${title}</h6>
      <div class="tooltip__content-ogrn">${ogrn}</div>
      <div class="tooltip__content-address">${address}</div>
    </div>
  `;
};

const tooltipDiscount = (sale, price) => {
  return `
    <div class="tooltip__content">
      <div class="tooltip__content-sale">
        <div class="text">Скидка ${sale}%:</div>
        <div class="price">- ${price} сом</div>
      </div>
    </div>
  `;
};

export const product = new Product();
