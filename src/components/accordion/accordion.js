import { checkbox } from "../../ui";
import "./accordion.scss";

class Accordion {
  render() {
    document
      .querySelector(".cart")
      .insertAdjacentHTML("afterend", this.template(cartContent, "cart"));

    document
      .querySelector(".product-wrapper")
      .insertAdjacentHTML("afterend", this.template(soldoutContent, "soldout"));
  }

  /**
   * Логика открытия и закрытия accordion.
   * @param {string} target - элемент, который будет скрываться
   * @param {string} trigger - триггер, который активирует
   * @param {string} className - модификатор класса для контента
   * @param {string} flag - флаг проверки
   * @param {string} classNameTrigger - модификатор класса для триггера
   * @param {string} accordion - сам accordion
   * @param {string} classNameAccordion - класс accordion
   */
  openAndClose(
    target,
    trigger,
    className,
    flag,
    classNameTrigger,
    accordion,
    classNameAccordion,
  ) {
    const targetElement = document.querySelector(target);
    const triggerElement = document.querySelector(trigger);
    const accordionElement = document.querySelector(accordion);

    triggerElement.addEventListener("click", () => {
      if (targetElement.className === flag) {
        triggerElement.classList.add(classNameTrigger);
        targetElement.classList.add(className);
        accordionElement
          ? accordionElement.classList.add(classNameAccordion)
          : null;
      } else {
        triggerElement.classList.remove(classNameTrigger);
        targetElement.classList.remove(className);
        accordionElement
          ? accordionElement.classList.remove(classNameAccordion)
          : null;
      }
    });
  }

  /**
   * Темплайте для accordion.
   * @param {string} content - id объекта, который будет удален
   * @param {string} id - id триггер, который открывает или закрывает accordion
   */
  template(content, id) {
    return `
    <div id="accordion-${id}" class="accordion">
      <div class="accordion-wrapper">
      ${content}
      </div>
    
      <img id=${id} class="accordion__arrow" src="/svg/arrow.svg">
    </div>
  `;
  }
}

const cartContent = `
  <div class="accordion__count">266 товаров · 2 100 569 сом</div>
  <div class="accordion__checkbox">
    ${checkbox.template("main")}
    <label for="checkbox-main"></label>
  </div>
  <div class="accordion-wrapper-all">Выбрать все</div>
`;

const soldoutContent = `<div class="accordion-wrapper-soldout">Отсутствуют · 3 товара</div>`;

export const accordion = new Accordion();
