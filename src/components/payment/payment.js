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

  eventListener(data) {
    const btnSelect = document.querySelector("#button-payment");
    const modal = document.querySelector("#modal-payment");
    const btnClose = document.querySelector("#btn-close-payment");
    const btnOpen = document.querySelectorAll("#btn-payment");

    btnClose.addEventListener("click", () => {
      this.closeModal();
    });

    btnOpen.forEach((value) => {
      value.addEventListener("click", () => {
        this.openModal();
      });
    });

    btnSelect.addEventListener("click", () => {
      paymentModal.selectCard(data);

      paymentModal.closeModal();
    });

    modal.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.querySelector("#radio-payment").checked = true;
  }

  closeModal() {
    ROOT_MODAL.style.display = "none";
    document.querySelector("#modal-payment").style.display = "none";
  }

  openModal() {
    ROOT_MODAL.style.display = "flex";
    document.querySelector("#modal-payment").style.display = "block";
  }

  selectCard(data) {
    const codeElement = document.querySelectorAll("#code");
    const codeImgElement = document.querySelectorAll("#codeImg");
    const radios = document.querySelectorAll("#radio-payment");

    radios.forEach((value, index) => {
      if (value.checked) {
        let number = data[index].number;
        let title = data[index].title;

        codeElement.forEach((value) => {
          value.innerHTML = number;
        });

        codeImgElement.forEach((value) => {
          value.src = `/svg/${title}.svg`;
        });
      }
    });
  }

  template(id) {
    const content = `
      <div class="payment__content">
        <div class="title">
          <h5>Способ оплаты</h5>
          <button id="btn-close-payment"><img src="/svg/close.svg"></button>
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
      ${radio.template(`payment`, "payment")}
      <div class="img">
        <img src="/svg/${card}.svg">
      </div>
      <div class="text">${text}</div>
  </li>
  `;
};

export const paymentModal = new PaymentModal();
