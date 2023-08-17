import "./tooltip.scss";

/**
 * Темплейт для тултипа.
 * @param {string | number} id
 * @param {string} content - контент внутри
 */
export const template = (id, content) => {
  return `
    <div id="${id}" class="tooltip">
      ${content}
    </div>
  `;
};
