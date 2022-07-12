import { localStorageUtil } from '../../storages/localStorage';
import { ICardItem } from '../../types/types';
import { catalog } from './catalog';
import './catalog.css';

export class Socks {
    draw() {
        let cardItem = '';
        catalog.forEach((card: ICardItem) => {
            const socksStorage = localStorageUtil.getProducts();
            let activeClass: string;
            let newClass: string;

            socksStorage.indexOf(card.name) === -1 ? (activeClass = 'item_cart') : (activeClass = 'item_cart-active');
            card.isNew ? (newClass = ' new') : (newClass = '');

            cardItem += `
                <div class = 'catalog_item${newClass}'>
                    <img class = 'item_img' src = '${card.image}' alt = '${card.name}'>
                    <h4 class = 'item_name' data-tooltip = 'Collection: ${card.collection} (${card.year}), Color: ${card.color}, Size: ${card.size}'>${card.name}</h4>
                    <div class = 'item_price'>${card.price} $</div>
                    <button class = '${activeClass}')'><img src = '../../assets/images/cart-ico.png' alt = 'add-btn'></button>
                    <div class = 'item_amount'>${card.amount} pairs left</div>
                </div>
                `;
        });

        (<HTMLElement>document.querySelector('.catalog_wrapper')).innerHTML = cardItem;
    }
}
