import { searchInput, socksCatalog } from '../../index';
import { localStorageUtil } from '../../storages/localStorage';
import { ICardItem } from '../../types/types';
import './catalog.css';

export class Socks {
    draw(items: ICardItem[]) {
        let cardItem = '';
        items.forEach((card: ICardItem) => {
            const socksStorage = localStorageUtil.getProducts();
            const inStorage: boolean = socksStorage.includes(card.name);
            const itemActiveClass: string = inStorage ? ' active_item' : '';
            const activeClass: string = inStorage ? '-active' : '';
            const newClass: string = card.isNew ? ' new' : '';

            cardItem += `
                <div class = 'catalog_item${newClass} ${itemActiveClass}'>
                    <img class = 'item_img' src = '${card.image}' alt = '${card.name}'>
                    <h4 class = 'item_name' data-tooltip = 'Collection: ${card.collection} (${card.year}), Color: ${card.color}, Size: ${card.size}'>${card.name}</h4>
                    <div class = 'item_price'>${card.price} $</div>
                    <button class = 'item_cart${activeClass}')'><img src = './assets/images/cart-ico.png' alt = 'add-btn'></button>
                    <div class = 'item_amount'>${card.amount} pairs left</div>
                </div>
                `;
        });

        (<HTMLElement>document.querySelector('.catalog_wrapper')).innerHTML = cardItem;
        socksCatalog.checkResults();
    }

    checkResults() {
        const results = document.querySelectorAll('.catalog_item');
        if (!results.length) {
            searchInput.noResult();
        }
    }
}
