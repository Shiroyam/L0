import "./checkbox.scss";

export const template = (id) => `
<div class="checkbox">
  <input class="checkbox__input" id="checkbox-${id}" type="checkbox" checked/>
  <label for="checkbox-${id}"></label>
</div>
`;
