import { header } from '../../index';
import { localStorageUtil } from '../../storages/localStorage';
import './header.css';

export class Header {
    draw(amount: number) {
        const headerHTML = `
            <a class = 'header_logo' href = '#'></a>
            <div class = 'header_cart'>
                <div class = 'cart_ico'></div>
                <span class = 'cart_counter'>(${amount})</span>
            </div>
        `;

        (<HTMLElement>document.querySelector('.header_wrapper')).innerHTML = headerHTML;
    }

    addToCart() {
        const cards = document.querySelectorAll('.catalog_item');
        cards.forEach(function (elem) {
            const cartButton: HTMLButtonElement = elem.querySelector('button') as HTMLButtonElement;
            const cardName: string = (<HTMLElement>elem.querySelector('.item_name')).innerText;
            (<HTMLButtonElement>cartButton).addEventListener('click', function () {
                const { pushProduct, socks } = localStorageUtil.putProducts(cardName);

                if (pushProduct) {
                    cartButton.classList.add('item_cart-active');
                } else {
                    cartButton.classList.remove('item_cart-active');
                    cartButton.classList.add('item_cart');
                }
                header.draw(socks.length);
            });
        });
    }
}
