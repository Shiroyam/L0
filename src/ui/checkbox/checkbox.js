import "./checkbox.scss";

/**
 * Темплейт для чекбокса.
 * @param {string | number} id
 */
export const template = (id, className) => `
<div class="checkbox">
  <input class="checkbox__input ${
    className ? className : ""
  }" id="checkbox-${id}" type="checkbox" checked/>
  <label for="checkbox-${id}"></label>
</div>
`;
