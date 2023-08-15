import { ROOT_MODAL } from "../../constants";
import { modal, radio, button } from "../../ui";
import "./payment.scss";

class PaymentModal {
  render(payment) {
    ROOT_MODAL.insertAdjacentHTML("beforeend", this.template());

    payment.forEach(({ id, number, title }) => {
      document
        .querySelector("#payment")
        .insertAdjacentHTML("beforeend", code(id, number, title));
    });
  }

  eventListener() {
    document.querySelector("#modal-payment").addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  closeModal() {
    document
      .querySelector("#btn-close-payment")
      .addEventListener("click", () => {
        ROOT_MODAL.style.display = "none";
        document.querySelector("#modal-payment").style.display = "none";
      });
  }

  openModal() {
    document.querySelectorAll("#btn-payment").forEach((element) => {
      element.addEventListener("click", () => {
        ROOT_MODAL.style.display = "flex";
        document.querySelector("#modal-payment").style.display = "block";
      });
    });
  }

  template() {
    const content = `
      <div class="payment__content">
        <div class="title">
          <h5>Способ оплаты</h5>
          <button id="btn-close-payment"><img src="./src/icons/close.svg"></button>
        </div>
        <ul id="payment" class="payment"></ul>
        ${button.template("payment", "Выбрать")}
      </div>
    `;

    return `${modal.template("payment", content)}`;
  }
}

const code = (id, text, card) => {
  return `
  <li class="payment-wrapper">
      ${radio.template(`payment-${id}`, "payment")}
      <div class="img">
        <img src="./src/icons/${card}.svg">
      </div>
      <div class="text">${text}</div>
  </li>
  `;
};

export const paymentModal = new PaymentModal();
