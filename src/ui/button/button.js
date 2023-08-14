import "./button.scss";

/**
 * Темплейт для кнопки.
 * @param {string | number} id
 * @param {string} text
 */
export const template = (id, text) => `
<button id="button-${id}" class="button">${text}</button>
`;
