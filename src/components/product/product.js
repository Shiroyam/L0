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

    products
      .filter(({ availability }) => availability)
      .map((data) => {
        document
          .querySelector("#delivery__product")
          .insertAdjacentHTML(
            "beforeend",
            this.deliveryTemplate(data.img[2], data.id, data.value),
          );
      });

    document
      .querySelector("#delivery__product-next")
      .insertAdjacentHTML(
        "beforeend",
        this.deliveryTemplate(
          products[1].img[2],
          products[1].id,
          products[1].value - 1,
        ),
      );
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
    const countHeader = document.querySelectorAll("#header-count");
    const countImg = document.querySelectorAll(`#delivery-count-${data.id}`);
    const countProduct = document.querySelector(`#btn-count-${data.id}`);
    const productWrapper = document.querySelector("#delivery__product");
    const deliveryProduct = document.querySelectorAll(
      `#delivery-product-${data.id}`,
    );
    const productWrapperNext = document.querySelector(
      "#delivery__product-next",
    );

    if (increment) {
      increment.addEventListener("click", () => {
        counter.onIncrement(data.id, data.count);

        this.incrementPrise(data.id, data.price, data.discount);

        this.incrementCount(data.id);

        if (checkbox.checked) {
          this.calculateTotalPrice();
        }

        this.selectPayment();
        this.fontResize();

        countImg.forEach((value) => {
          if (value.id == "delivery-count-1") {
            return (countImg[1].innerHTML = Number(countProduct.innerHTML) - 1);
          }

          value.innerHTML = countProduct.innerHTML;
        });

        this.checkVisibilityCountImg();
        if (data.id == 1) {
          this.checkVisibilitySplitProductDelivery(
            productWrapperNext.childNodes,
          );
          this.checkVisibilityDeliveryDate(
            productWrapperNext,
            checkbox.checked,
          );
        }
      });
    }

    if (decrement) {
      decrement.addEventListener("click", () => {
        this.decrementCount(data.id);

        this.decrementPrise(data.id, data.price, data.discount);

        counter.onDecrement(data.id);

        if (checkbox.checked) {
          this.calculateTotalPrice();
        }

        this.selectPayment();
        countImg.forEach((value) => {
          if (value.id == "delivery-count-1") {
            return (countImg[1].innerHTML = Number(countProduct.innerHTML) - 1);
          }

          value.innerHTML = countProduct.innerHTML;
        });

        this.checkVisibilityCountImg();

        if (data.id == 1) {
          this.checkVisibilitySplitProductDelivery(
            productWrapperNext.childNodes,
          );
          this.checkVisibilityDeliveryDate(
            productWrapperNext,
            checkbox.checked,
          );
        }
      });
    }

    if (checkbox) {
      checkbox.addEventListener("change", () => {
        this.calculateTotalPrice();
        this.selectPayment();
        this.checkVisibilityProductDelivery(deliveryProduct, checkbox.checked);
        this.checkVisibilityDeliveryDate(productWrapper);
        this.checkVisibilityCountImg();

        if (data.id == 1) {
          this.checkVisibilityDeliveryDate(
            productWrapperNext,
            checkbox.checked,
          );
        }
      });

      checkboxAll.addEventListener("change", () => {
        this.selectAll(checkbox, checkboxAll.checked);
        this.checkVisibilityProductDelivery(deliveryProduct, checkbox.checked);
        this.calculateTotalPrice();
        this.selectPayment();
        this.checkVisibilityDeliveryDate(productWrapper);

        if (data.id == 1) {
          this.checkVisibilityDeliveryDate(
            productWrapperNext,
            checkbox.checked,
          );
        }
      });
    }

    like.addEventListener("click", () => {
      counter.onLike(like);
    });

    remove.addEventListener("click", () => {
      counter.onRemove(`#product-${data.id}`);

      deliveryProduct.forEach((value) => {
        value.remove();
      });

      countHeader.forEach((value) => {
        value.innerHTML = Number(value.innerHTML) - 1;
      });

      this.calculateTotalPrice();
      this.checkVisibilityCountHeader();
      this.selectPayment();
      this.checkVisibilityDeliveryDate(productWrapper);
      this.checkVisibilityDeliveryDate(productWrapperNext);
      this.availabilityCounter();
    });

    checkboxPayment.addEventListener("change", () => {
      this.selectPayment();
    });

    this.eventHoverTooltip(
      btnOOO,
      tooltip.template(
        data.id,
        tooltipCompany(
          data.company.title,
          data.company.orgn,
          data.company.address,
        ),
      ),
      `#tooltip-${data.id}`,
      "afterend",
    );

    if (bntDiscount) {
      const percent = Number(data.price) / 100;
      const sale =
        Math.floor((Number(data.price) - Number(data.discount)) / percent) - 10;
      const total = sale * percent;
      const extraDiscount = Math.floor(percent * 10);

      this.eventHoverTooltip(
        bntDiscount,
        tooltip.template(
          data.id,
          tooltipDiscount(sale, total, extraDiscount),
          "price-tooltip",
        ),
        `#tooltip-${data.id}`,
        "beforeend",
      );
    }

    this.splitProductDelivery(countImg);
    this.checkVisibilityCountImg();
  }

  /**
   * Ховер для тултипа
   */
  eventHoverTooltip(trigger, content, id, position) {
    trigger.addEventListener("mouseover", () => {
      trigger.insertAdjacentHTML(position, content);
    });

    trigger.addEventListener("mouseout", () => {
      const element = document.querySelector(id);

      element.remove();
    });
  }

  /**
   * Убавление цены при изменении счетчика
   */
  incrementPrise(id, price, discount) {
    const priceProduct = document.querySelector(`#product-discount-${id}`);
    const discountProduct = document.querySelector(`#product-price-${id}`);
    const count = document.querySelector(`#count-${id}`);

    if (count) {
      if (Number(count.innerHTML)) {
        priceProduct.innerHTML =
          Number(priceProduct.innerHTML) + Number(discount);

        discountProduct.innerHTML =
          Number(discountProduct.innerHTML) + Number(price);
      }
    } else {
      priceProduct.innerHTML =
        Number(priceProduct.innerHTML) + Number(discount);

      discountProduct.innerHTML =
        Number(discountProduct.innerHTML) + Number(price);
    }
  }

  /**
   * Добавление цены при изменении счетчика
   */
  decrementPrise(id, price, discount) {
    const priceProduct = document.querySelector(`#product-discount-${id}`);
    const discountProduct = document.querySelector(`#product-price-${id}`);
    const countItem = document.querySelector(`#btn-count-${id}`);

    if (Number(countItem.innerHTML) > 1) {
      priceProduct.innerHTML =
        Number(priceProduct.innerHTML) - Number(discount);

      discountProduct.innerHTML =
        Number(discountProduct.innerHTML) - Number(price);
    }
  }

  /**
   * Добавление товара при изменении счетчика
   */
  incrementCount(id) {
    const countProduct = document.querySelector(`#count-${id}`);
    const count = document.querySelectorAll(`#total-products`);
    const checkbox = document.querySelector(`#checkbox-${id}`);

    if (countProduct) {
      if (Number(countProduct.innerHTML)) {
        countProduct.innerHTML = Number(countProduct.innerHTML) - 1;

        if (checkbox.checked) {
          count.forEach((value) => {
            value.innerHTML = Number(value.innerHTML) + 1;
          });
        }
      }
    } else if (checkbox.checked) {
      count.forEach((value) => {
        value.innerHTML = Number(value.innerHTML) + 1;
      });
    }
  }

  /**
   * Убавление товара при изменении счетчика
   */
  decrementCount(id) {
    const countProduct = document.querySelector(`#count-${id}`);
    const countTotal = document.querySelectorAll(`#total-products`);
    const countItem = document.querySelector(`#btn-count-${id}`);
    const checkbox = document.querySelector(`#checkbox-${id}`);

    if (countProduct) {
      if (Number(countItem.innerHTML) > 1) {
        countProduct.innerHTML = Number(countProduct.innerHTML) + 1;

        if (checkbox.checked) {
          countTotal.forEach((value) => {
            value.innerHTML = Number(value.innerHTML) - 1;
          });
        }
      }
    } else if (Number(countItem.innerHTML) > 1 && checkbox.checked) {
      countTotal.forEach((value) => {
        value.innerHTML = Number(value.innerHTML) - 1;
      });
    }
  }

  /**
   * Пересчет конечной цены при каждом изменении счетчика или чекбокса
   */
  calculateTotalPrice() {
    const priceTotal = document.querySelectorAll(`#total-price`);
    const discountTotal = document.querySelector(`#total-discount`);
    const countTotal = document.querySelectorAll(`#total-products`);
    const checkboxes = document.querySelectorAll(".checkbox-product");
    let price = 0;
    let discount = 0;
    let count = 0;

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        let id = checkbox.id.split("-").at(-1);

        const countProduct = document.querySelector(`#btn-count-${id}`);
        count += Number(countProduct.innerHTML);

        const priceProduct = document.querySelector(`#product-discount-${id}`);
        price += Number(priceProduct.innerHTML);

        const discountProduct = document.querySelector(`#product-price-${id}`);
        discount +=
          Number(discountProduct.innerHTML) - Number(priceProduct.innerHTML);
      }
    });

    priceTotal.forEach((value) => {
      value.innerHTML = price;
    });

    countTotal.forEach((value) => {
      value.innerHTML = count;
    });

    discountTotal.innerHTML = discount;
  }

  /**
   * Выбрать все чекбоксы
   */
  selectAll(checkbox, checked) {
    checked ? (checkbox.checked = true) : (checkbox.checked = false);
  }

  /**
   * Чекбокс оплаты
   */
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

  /**
   * Проверка на количество товаров
   */
  checkVisibilityCountHeader() {
    const countHeader = document.querySelectorAll(`#header-count`);

    countHeader.forEach((value) => {
      if (value.innerHTML == 0) {
        value.classList.add("header__icon-hidden");
      } else {
        value.classList.remove("header__icon-hidden");
      }
    });
  }

  /**
   * Проверка на количество товаров в картинках
   */
  checkVisibilityCountImg() {
    const countImg = document.querySelectorAll(`.delivery__icon-count`);

    countImg.forEach((value) => {
      if (value.innerHTML == 1 || value.innerHTML == 0) {
        value.classList.add("header__icon-hidden");
      } else {
        value.classList.remove("header__icon-hidden");
      }
    });
  }

  /**
   * Отображение картинки продукта в доставке
   */
  checkVisibilityProductDelivery(element, checked) {
    element.forEach((value) => {
      if (checked) {
        value.classList.remove("split-hidden");
      } else {
        value.classList.add("split-hidden");
      }
    });
  }

  /**
   * Спилт товаров в разные дни доставки
   */
  splitProductDelivery(product) {
    const lastElement = product.length - 1;

    product.forEach((value, index) => {
      if (lastElement == index) {
        return value.classList.remove("split-hidden");
      }

      value.classList.add("split-hidden");
    });
  }

  checkVisibilitySplitProductDelivery(product) {
    const count = document.querySelector("#btn-count-1");

    if (count.innerHTML == 1) {
      return product[1].classList.add("hidden");
    }

    product[1].classList.remove("hidden");
  }

  checkVisibilityDeliveryDate(product, checked = true) {
    const element = product.childNodes;
    const elementLength = element.length;
    let number = 0;

    for (let i = 1; i < elementLength; i++) {
      if (element[i].classList[0] !== "hidden" && checked) {
        number++;
      }
    }

    if (number === 0) {
      product.parentNode.classList.add("delivery__date--hidden");
    } else {
      product.parentNode.classList.remove("delivery__date--hidden");
    }
  }

  availabilityCounter() {
    const availability = document.querySelector("#availability");
    const productAvailabilityWrapper = document.querySelector(
      ".product-wrapper-soldout",
    );

    availability.innerHTML = productAvailabilityWrapper.children.length;
  }

  template(data) {
    return `
      <li id="product-${data.id}">
        <article class="product ${data.availability ? `` : `product--soldout`}">
        
        ${
          data.availability
            ? checkbox.template(data.id, "checkbox-product")
            : ``
        }
        ${
          data.size
            ? `<div class="product__size-mobile">${data.size}</div>`
            : ``
        }
        
        <img class="product__img" src=${data.img[1]} srcset="${data.img[0]}" />
      
        <div class="product__text">
          <h2 class="product__text-title">${data.title}</h2>
          <div class="product__text-description">
            ${data.color ? `<span>Цвет: ${data.color}</span>` : ``}
            ${data.size ? `<span class="size">Размер: ${data.size}</span>` : ``}
          </div>
          <div class="product__text-company">
            <div>${data.IP}</div>
            <div class="company">${
              data.company.title
            } <img src="/svg/info.svg" id="OOO-${data.id}"></div>
          </div>
        </div>
      
        ${counter.template(data.value, data.count, data.id, data.availability)}
      
        ${
          data.availability
            ? `<div class="product__price">
                <div>
                  <span id="product-discount-${
                    data.id
                  }" class="product__price-total">${
                    data.discount * data.value
                  }</span>
                  <span class="product__price-currency">сом</span>
                </div>
                <div id="wrapper-price-${data.id}" class="product-discount">
                  <span id="product-price-${data.id}" class="number">${
                    data.price * data.value
                  }</span>
                  <span class="currency">сом</span>
                </div>
              </div>`
            : ``
        }
        </article>
      </li>
    `;
  }

  deliveryTemplate(img, id, count) {
    return `<div id="delivery-product-${id}">
      <img class="img" src="${img}" />
      <div id="delivery-count-${id}" class="delivery__icon-count">${count}</div>
    </div>`;
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

const tooltipDiscount = (sale, price, discount) => {
  return `
    <div class="tooltip__content">
      <div class="tooltip__content-sale">
        <div class="content">
          <div class="text">Скидка ${sale}%</div>
          <div class="price">− ${price} сом</div>
        </div>
        <div class="content">
          <div class="text">Скидка покупателя 10%</div>
          <div class="price">− ${discount} сом</div>
        </div>
      </div>
    </div>
  `;
};

export const product = new Product();
