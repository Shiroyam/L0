import "./input.scss";

/**
 * Темплейт для инпута.
 * @param {string | number} id
 * @param {string} placeholder
 * @param {string} value - начальное значение
 * @param {string} description - описание инпута
 */
export const template = (id, placeholder, value, description) => {
  return `
 <div id="${id}" class="wrapper-input">
  <input id="filed-${id}" name="${id}" class="input" type="text" value="${value}" required="required">
  <label class="input-label">${placeholder}</label>
  ${description ? `<div class="description">${description}</div>` : ``}
 </div>
  `;
};
