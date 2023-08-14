import { input } from "../../ui";

class Form {
  render() {
    document
      .querySelector(".form__wrapper")
      .insertAdjacentHTML("beforeend", input.template("input-name", "Имя", ""));

    document
      .querySelector(".form__wrapper")
      .insertAdjacentHTML(
        "beforeend",
        input.template("input-surname", "Фамилия", ""),
      );

    document
      .querySelector(".form__wrapper")
      .insertAdjacentHTML(
        "beforeend",
        input.template("input-email", "Почта", ""),
      );

    document
      .querySelector(".form__wrapper")
      .insertAdjacentHTML(
        "beforeend",
        input.template("input-telephone", "Телефон", "+7 988 123-45-67"),
      );

    document
      .querySelector(".form__wrapper")
      .insertAdjacentHTML(
        "beforeend",
        input.template("input-INN", "ИНН", "", "Для таможенного оформления"),
      );
  }
}

export const form = new Form();
