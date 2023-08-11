import { counter } from "../counter";
import "./product.scss";

export const template = (data) => {
  return `
  <li>
   <article id="product-${data.id}" class="product ${
     data.availability ? `` : `product--soldout`
   }">
  
   <div class="product__checkbox">
     <input class="product__checkbox-input" id="checkbox-${
       data.id
     }" type="checkbox" checked/>
     <label for="checkbox-${data.id}"></label>
   </div>
 
   <img class="product__img" src=${data.img} />
 
   <div class="product__text">
     <h2 class="product__text-title">${data.title}</h2>
     <div class="product__text-description">
       ${data.color ? `<span>Цвет: ${data.color}</span>` : ``}
       ${data.size ? `<span>Размер: ${data.size}</span>` : ``}
     </div>
     <div class="product__text-company">
       <div>${data.IP}</div>
       <div>${data.OOO} <img src="./src/icons/info.svg"></div>
     </div>
   </div>
 
   ${counter.template(1, data.count, data.id, data.availability)}
 
   ${
     data.availability
       ? `<div class="product__price">
           <div class="product__price-total">${data.discount} <span>сом</span></div>
           <div class="product__price-discount">${data.price} <span>сом</span></div>
         </div>`
       : ``
   }
   </article>
  </li>
   `;
};
