import "./tooltip.scss";

/**
 * Темплейт для тултипа.
 * @param {string | number} id
 * @param {string} content - контент внутри
 * * @param {string} className - контент внутри
 */
export const template = (id, content, className) => {
  return `
    <div id="tooltip-${id}" class="tooltip ${className ? className : ""}">
      ${content}
    </div>
  `;
};
