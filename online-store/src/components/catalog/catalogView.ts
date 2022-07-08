import { ICardItem } from '../../types/types';
import { catalog } from './catalog';
import './catalog.css';

export class Socks {
    draw() {
        let cardItem = '';
        catalog.forEach((card: ICardItem) => {
            if (card.isNew) {
                cardItem += `
                <div class = 'catalog_item new'>
                    <img class = 'item_img' src = '${card.image}' alt = '${card.name}'>
                    <h4 class = 'item_name' data-tooltip = 'Collection: ${card.collection} (${card.year}), Color: ${card.color}'>${card.name}</h4>
                    <div class = 'item_price'>${card.price} $</div>
                    <button class = 'item_cart'><img src = '../../assets/images/cart-ico.png' alt = 'add-btn'></button>
                    <div class = 'item_amount'>${card.amount} pairs left</div>
                </div>
                `;
            } else {
                cardItem += `
                <div class = 'catalog_item'>
                    <img class = 'item_img' src = '${card.image}' alt = '${card.name}'>
                    <h4 class = 'item_name' data-tooltip = 'Collection: ${card.collection} (${card.year}), Color: ${card.color}'>${card.name}</h4>
                    <div class = 'item_price'>${card.price} $</div>
                    <button class = 'item_cart'><img src = '../../assets/images/cart-ico.png' alt = 'add-btn'></button>
                    <div class = 'item_amount'>${card.amount} pairs left</div>
                </div>
                `;
            }
        });

        (<HTMLElement>document.querySelector('.catalog_wrapper')).innerHTML = cardItem;
    }
}
