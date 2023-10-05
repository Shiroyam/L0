import { ROOT_MODAL } from "../../constants";
import { modal, button, radio } from "../../ui";
import "./delivery.scss";

class DeliveryModal {
  render(address) {
    ROOT_MODAL.insertAdjacentHTML("beforeend", this.template());

    address.point.forEach(({ id, address, stars }) => {
      document
        .querySelector("#point")
        .insertAdjacentHTML("beforeend", point(id, address, stars));
    });

    address.courier.forEach(({ id, address }) => {
      document
        .querySelector("#courier")
        .insertAdjacentHTML("beforeend", courier(id, address));
    });
  }

  eventListener(address) {
    const pointBtn = document.querySelector("#point-btn");
    const pointWrapper = document.querySelector("#point");
    const courierBtn = document.querySelector("#courier-btn");
    const courierWrapper = document.querySelector("#courier");
    const btnOpen = document.querySelectorAll("#btn-delivery");
    const btnClose = document.querySelector("#btn-close-delivery");
    const btnSelect = document.querySelector("#button-delivery");
    const btnRemove = document.querySelectorAll(".btn");
    const point = document.querySelectorAll(".point-wrapper");
    const courier = document.querySelectorAll(".courier-wrapper");
    const addressElement = document.querySelectorAll("#address");
    const scheduler = document.querySelector(".delivery__point-schedule");

    btnRemove.forEach((value) => {
      value.addEventListener("click", (e) => {
        e.stopPropagation();
        value.parentElement.remove();

        addressElement.forEach((value) => {
          value.innerHTML = "Адрес не выбран!";
        });

        scheduler.style.display = "none";
      });
    });

    btnOpen.forEach((value) => {
      value.addEventListener("click", () => {
        this.openModal();
      });
    });

    btnClose.addEventListener("click", () => {
      this.closeModal();
    });

    pointBtn.addEventListener("click", () => {
      pointBtn.classList.add("tab--active");
      pointWrapper.classList.add("point--active");

      courierBtn.classList.remove("tab--active");
      courierWrapper.classList.remove("courier--active");
    });

    courierBtn.addEventListener("click", () => {
      courierBtn.classList.add("tab--active");
      courierWrapper.classList.add("courier--active");

      pointBtn.classList.remove("tab--active");
      pointWrapper.classList.remove("point--active");
    });

    btnSelect.addEventListener("click", () => {
      this.selectAddress(address);

      this.closeModal();
    });

    document.querySelector("#modal-delivery").addEventListener("click", (e) => {
      e.stopPropagation();
    });

    point.forEach((value) => {
      value.addEventListener("click", () => {
        value.childNodes[1].checked = true;
      });
    });

    courier.forEach((value) => {
      value.addEventListener("click", () => {
        value.childNodes[1].checked = true;
      });
    });

    document.querySelector("#radio-point").checked = true;
  }

  closeModal() {
    ROOT_MODAL.style.display = "none";
    document.querySelector("#modal-delivery").style.display = "none";
  }

  openModal() {
    ROOT_MODAL.style.display = "flex";
    document.querySelector("#modal-delivery").style.display = "block";
  }

  selectAddress(data) {
    const addressElement = document.querySelectorAll("#address");
    const radiosPoint = document.querySelectorAll("#radio-point");
    const radiosCourier = document.querySelectorAll("#radio-courier");
    const star = document.querySelector("#star-number");
    const scheduler = document.querySelector(".delivery__point-schedule");

    radiosPoint.forEach((value, index) => {
      if (value.checked) {
        let title = data.point[index].address;
        let stars = data.point[index].stars;

        addressElement.forEach((value) => {
          value.innerHTML = title;
        });

        star.innerHTML = stars;
        scheduler.style.display = "block";
      }
    });

    radiosCourier.forEach((value, index) => {
      if (value.checked) {
        let title = data.courier[index].address;

        addressElement.forEach((value) => {
          value.innerHTML = title;
        });

        scheduler.style.display = "none";
      }
    });
  }

  template() {
    const content = `
      <div class="delivery__content">
        <div class="title">
          <h5>Способ доставки</h5> 
          <button id="btn-close-delivery"><img src="/svg/close.svg"></button>
        </div>
        <div class="tabs">
          ${tabs}
        </div>
        <ui id="courier" class="courier">
        <h6 class="text-courier">Мои адреса</h6>
        </ui>
        <ui id="point" class="point point--active">
          <h6 class="text-point">Мои адреса</h6>
        </ui>
        ${button.template("delivery", "Выбрать")}
      </div>
  `;

    return `${modal.template("delivery", content)}`;
  }
}

const tabs = `
  <button id="point-btn" class="tab tab--active">В пункт выдачи</button>
  <button id="courier-btn" class="tab">Курьером</button>
`;

const point = (id, address, star) => {
  return `
    <li class="point-wrapper">
      ${radio.template(`point`, "address")}
      <div>
        <div class="text">${address}</div>
        <div><img src="/svg/stars.svg"> ${star}</div>
      </div>
      <button class="btn">
        <svg id="remove-${id}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path class="path-svg" fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" />
          <path class="path-svg" fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" />
          <path class="path-svg" fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" />
        </svg>
      </button>
    </li>
  `;
};

const courier = (id, text) => {
  return `
  <li class="courier-wrapper">
      ${radio.template(`courier`, "address")}
      <div class="text">${text}</div>
      <button class="btn">
        <svg id="remove-${id}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path class="path-svg" fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" />
          <path class="path-svg" fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" />
          <path class="path-svg" fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" />
        </svg>
      </button>
    </li>
  `;
};

export const deliveryModal = new DeliveryModal();
