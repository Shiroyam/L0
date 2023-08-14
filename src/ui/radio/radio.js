import "./radio.scss";

/**
 * Темплейт для радио-кнопки.
 * @param {string | number} id
 * @param {string} name
 */
export const template = (id, name) => {
  return `
    <input id="radio-${id}" class="radio" name="${name}" type="radio">
  `;
};
