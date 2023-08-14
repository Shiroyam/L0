import "./modal.scss";

/**
 * Темплейт для модального окна.
 * @param {string | number} id
 * @param {string} content - контент внутри окна
 */
export const template = (id, content) => {
  return `
    <div id="modal-${id}" class="modal__content">
      ${content}
    </div>
  `;
};
