import "./accordion.scss";

export const cartContent = `
<div class="accordion__count">266 товаров · 2 100 569 сом</div>
<div class="accordion__checkbox">
  <input class="accordion__checkbox-input" id="checkbox-main" type="checkbox" checked/>
  <label for="checkbox-main"></label>
</div>
<div class="accordion-wrapper-all">Выбрать все</div>
`;

export const soldoutContent = `<div class="accordion-wrapper-soldout">Отсутствуют · 3 товара</div>`;

/**
 * Темплайте для accordion.
 * @param {string} content - id объекта, который будет удален
 * @param {string} id - id триггер, который открывает или закрывает accordion
 */
export const template = (content, id) => {
  return `
    <div class="accordion">
      <div class="accordion-wrapper">
      ${content}
      </div>
    
      <img id=${id} class="accordion__arrow" src="./src/icons/arrow.svg">
    </div>
  `;
};

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
export const accordion = (
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
