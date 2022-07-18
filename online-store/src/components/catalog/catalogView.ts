//import { filterControllers, nouislider, sorting } from '../../index';
import { localStorageUtil } from '../../storages/localStorage';
import { ICardItem } from '../../types/types';
//import { catalog } from './catalog';

import './catalog.css';

export class Socks {
    draw(items: ICardItem[]) {
        let cardItem = '';
        /*let catalogToDraw = sorting.sort(catalog) as ICardItem[];
        catalogToDraw = filterControllers.collectionFilter(catalogToDraw);
        catalogToDraw = filterControllers.sizeFilter(catalogToDraw);
        catalogToDraw = filterControllers.newFilter(catalogToDraw);
        catalogToDraw = filterControllers.colorFilter(catalogToDraw);
        catalogToDraw = nouislider.priceRange(catalogToDraw);
        catalogToDraw = nouislider.amountRange(catalogToDraw);
        console.log(catalogToDraw);*/
        items.forEach((card: ICardItem) => {
            const socksStorage = localStorageUtil.getProducts();
            let activeClass: string;
            let newClass: string;
            let hideClass: string;

            socksStorage.indexOf(card.name) === -1 ? (activeClass = 'item_cart') : (activeClass = 'item_cart-active');
            card.isNew ? (newClass = ' new') : (newClass = '');
            card.isHide ? (hideClass = 'hide ') : (hideClass = '');

            cardItem += `
                <div class = '${hideClass}catalog_item${newClass}'>
                    <img class = 'item_img' src = '${card.image}' alt = '${card.name}'>
                    <h4 class = 'item_name' data-tooltip = 'Collection: ${card.collection} (${card.year}), Color: ${card.color}, Size: ${card.size}'>${card.name}</h4>
                    <div class = 'item_price'>${card.price} $</div>
                    <button class = '${activeClass}')'><img src = '../../assets/images/cart-ico.png' alt = 'add-btn'></button>
                    <div class = 'item_amount'>${card.amount} pairs left</div>
                </div>
                `;
        });

        (<HTMLElement>document.querySelector('.catalog_wrapper')).innerHTML = cardItem;
        console.log('draw');
    }
}
