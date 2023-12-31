import { input } from "../../ui";
import {
  validateDefaultField,
  validateINN,
  validateEmail,
  validateTelephone,
} from "../../utils";

class Form {
  render() {
    configInput.forEach((value) => {
      document
        .querySelector(".form__wrapper")
        .insertAdjacentHTML(
          "beforeend",
          input.template(
            value.id,
            value.placeholder,
            value.defaultValue,
            value.description,
            value.type,
          ),
        );
    });
  }

  eventListener() {
    const telephoneInput = document.querySelector("#filed-input-telephone");
    const btnTotal = document.querySelector("#button-total");
    const form = document.querySelector(".form");

    configInput.forEach((value) => {
      const input = document.querySelector(`#filed-${value.id}`);

      this.eventChange(input, input, value.validateSchema);

      this.eventFocusOut(input, input, value.validateSchema, value.errorText);
    });

    telephoneInput.addEventListener("input", () => {
      telephoneInput.value = telephoneInput.value.replace(/[^\d\s()+-]/g, "");
    });

    btnTotal.addEventListener("click", () => {
      configInput.forEach((value) => {
        const input = document.querySelector(`#filed-${value.id}`);
        const error = value.validateSchema(input.value);
        const errorText = document.querySelector(`#error-${input.id}`);

        if (!error) {
          form.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          if (!errorText) {
            this.triggerError(input, value.errorText);
          }
        }
      });
    });
  }

  eventChange(trigger, target, validation) {
    trigger.addEventListener("input", () => {
      const error = document.querySelector(`#error-${trigger.id}`);

      if (validation(trigger.value) && error) {
        target.classList.remove("error");
        error.remove();
      }
    });
  }

  eventFocusOut(trigger, target, validation, errorText) {
    trigger.addEventListener("focusout", () => {
      const error = document.querySelector(`#error-${trigger.id}`);

      if (!validation(trigger.value) && !error && trigger.value.length > 0) {
        this.triggerError(target, errorText);
      }
    });
  }

  triggerError(target, description) {
    target.classList.add("error");
    target.insertAdjacentHTML(
      "afterend",
      `<div id="error-${target.id}" class="description description-error">${description}</div>`,
    );
  }
}

const configInput = [
  {
    id: "input-name",
    placeholder: "Имя",
    defaultValue: "",
    errorText: "Укажите имя",
    validateSchema: validateDefaultField,
    type: "text",
  },
  {
    id: "input-surname",
    placeholder: "Фамилия",
    defaultValue: "",
    errorText: "Укажите фамилию",
    validateSchema: validateDefaultField,
    type: "text",
  },
  {
    id: "input-email",
    placeholder: "Электронная почта",
    defaultValue: "",
    errorText: "Укажите почту",
    validateSchema: validateEmail,
    type: "text",
  },
  {
    id: "input-telephone",
    placeholder: "Телефон",
    defaultValue: "+7 988 123-45-67",
    errorText: "Укажите телефон",
    validateSchema: validateTelephone,
    type: "text",
  },
  {
    id: "input-INN",
    placeholder: "ИНН",
    defaultValue: "",
    errorText: "Укажите ИНН",
    description: "Для таможенного оформления",
    validateSchema: validateINN,
    type: "number",
  },
];

export const form = new Form();
