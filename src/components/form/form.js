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
          ),
        );
    });
  }

  eventListener() {
    const btnTotal = document.querySelector("#button-total");
    const form = document.querySelector(".form");

    configInput.forEach((value) => {
      const input = document.querySelector(`#filed-${value.id}`);

      this.eventChange(input, input, value.validateSchema);

      this.eventFocusOut(input, input, value.validateSchema, value.errorText);
    });

    btnTotal.addEventListener("click", () => {
      configInput.forEach((value) => {
        const input = document.querySelector(`#filed-${value.id}`);

        const error = value.validateSchema(input.value);

        if (!error) {
          form.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          this.triggerError(input, value.errorText);
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
  },
  {
    id: "input-surname",
    placeholder: "Фамилия",
    defaultValue: "",
    errorText: "Укажите фамилию",
    validateSchema: validateDefaultField,
  },
  {
    id: "input-email",
    placeholder: "Электронная почта",
    defaultValue: "",
    errorText: "Укажите почту",
    validateSchema: validateEmail,
  },
  {
    id: "input-telephone",
    placeholder: "Телефон",
    defaultValue: "+7 988 123-45-67",
    errorText: "Укажите телефон",
    validateSchema: validateTelephone,
  },
  {
    id: "input-INN",
    placeholder: "ИНН",
    defaultValue: "",
    errorText: "Укажите ИНН",
    description: "Для таможенного оформления",
    validateSchema: validateINN,
  },
];

export const form = new Form();
