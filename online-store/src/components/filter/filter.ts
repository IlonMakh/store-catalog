import { filterControllers, header, nouislider, socksCatalog, sorting } from '../../index';
import { ICardItem } from '../../types/types';
import { catalog } from '../catalog/catalog';
import './filter.css';

export class Filter {
    draw() {
        const collections = [
            'No collection',
            'Superhero workdays',
            'Disney princess dream',
            'Warm and cozy',
            'Hogwarts school',
            'Christmas morning',
            'Colorful mood',
            'Summer vibes',
        ];
        const colors = ['white', 'black', 'red', 'grey', 'blue', 'pink', 'purple', 'yellow', 'green'];
        const sizes = ['34', '35', '36', '37', '38', '39', '40', '41', '42', '43'];
        const htmlSorting = `
            <div class='filter'>
                <div class='filter_collection'>
                    <h6>Collection</h6>
                    <select class='collection_select' name='collection[]'>
                        ${collections
                            .map((collection) => {
                                return `<option value = '${collection}'>${collection}</option>`;
                            })
                            .join('')}
                    </select>
                </div>
                <div class='filter_size'>
                    <h6>Size</h6>
                    <div class='sizes'>
                    ${sizes
                        .map((size) => {
                            return `<button class = 'size-btn'>${size}</button>`;
                        })
                        .join('')}
                    </div>
                </div>
                <div class='filter_color'>
                    <h6>Color</h6>
                    <div class = 'colors'>
                    ${colors
                        .map((color) => {
                            return `<div class=${color}>
                            <input type="checkbox" class = "color_checkbox" id=${color}>
                            <label for=${color}>${color}</label>
                        </div>`;
                        })
                        .join('')}
                    </div>
                </div>
                <div class='filter_new'>
                    <label for='new_checkbox'>Show only new</label>
                    <input type='checkbox' id='new_checkbox'>
                </div>
                <div class = 'filter_price'>
                    <h6>Price ($)</h6>
                    <div class = 'price_range'>
                        <input readonly  type = 'number' min = '1' max = '10' value = '1' class = 'price_input-min'>
                        <div class = 'price_slider'></div>
                        <input readonly  type = 'number' min = '1' max = '10' value ='10' class = 'price_input-max'>
                    </div>
                </div>
                <div class = 'filter_amount'>
                    <h6>Amount (pairs left)</h6>
                    <div class = 'amount_range'>
                        <input readonly type = 'number' min = '1' max = '100' value = '1' class = 'amount_input-min'>
                        <div class = 'amount_slider'></div>
                        <input readonly type = 'number' min ='1' max = '100' value ='100' class = 'amount_input-max'>
                    </div>
                </div>
            </div>
        `;
        (<HTMLElement>document.querySelector('.sorting-and-filter')).innerHTML = htmlSorting;

        const selector: HTMLSelectElement = document.querySelector('.collection_select') as HTMLSelectElement;
        selector.addEventListener('change', () => {
            socksCatalog.draw(filterControllers.allFilters(catalog));
            header.addToCart();
        });

        const sizeButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.size-btn');
        sizeButtons.forEach(function (elem) {
            elem.addEventListener('click', function () {
                elem.classList.toggle('active');
                socksCatalog.draw(filterControllers.allFilters(catalog));
                header.addToCart();
            });
        });

        const checkbox: HTMLInputElement = document.getElementById('new_checkbox') as HTMLInputElement;
        checkbox.addEventListener('change', () => {
            socksCatalog.draw(filterControllers.allFilters(catalog));
            header.addToCart();
        });

        const clrCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.color_checkbox');
        clrCheckboxes.forEach(function (elem) {
            elem.addEventListener('change', () => {
                socksCatalog.draw(filterControllers.allFilters(catalog));
                header.addToCart();
            });
        });
    }

    allFilters(cards: ICardItem[]): ICardItem[] {
        let filteredCards: ICardItem[] = sorting.sort(cards);
        filteredCards = filterControllers.collectionFilter(filteredCards);
        filteredCards = filterControllers.sizeFilter(filteredCards);
        filteredCards = filterControllers.newFilter(filteredCards);
        filteredCards = filterControllers.colorFilter(filteredCards);
        filteredCards = nouislider.priceRange(filteredCards);
        filteredCards = nouislider.amountRange(filteredCards);
        return filteredCards;
    }

    collectionFilter(cards: ICardItem[]): ICardItem[] {
        const selector: HTMLSelectElement = document.querySelector('.collection_select') as HTMLSelectElement;
        const filteredCards: ICardItem[] = cards.filter(function (card): boolean {
            return selector.value === 'No collection' || card.collection === selector.value;
        });
        return filteredCards;
    }

    newFilter(cards: ICardItem[]) {
        const checkbox: HTMLInputElement = document.getElementById('new_checkbox') as HTMLInputElement;
        const filteredCards: ICardItem[] = cards.filter(function (card): boolean {
            return checkbox.checked ? card.isNew === true : true;
        });
        return filteredCards;
    }

    sizeFilter(cards: ICardItem[]): ICardItem[] {
        const sizeButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.size-btn');
        const activeBtns: HTMLElement[] = Array.from(sizeButtons).filter((elem) => elem.classList.contains('active'));

        if (activeBtns.length) {
            const btnNames: string[] = activeBtns.map((btn) => btn.innerHTML);
            return cards.filter((card): boolean => btnNames.some((btnName) => +btnName == card.size));
        }

        return cards;
    }

    colorFilter(cards: ICardItem[]): ICardItem[] {
        const clrCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.color_checkbox');
        const activeChbx: HTMLInputElement[] = Array.from(clrCheckboxes).filter((elem) => elem.checked);

        if (activeChbx.length) {
            const chbxId: string[] = activeChbx.map((chbx) => chbx.id);
            return cards.filter((card): boolean => chbxId.some((chbxId) => chbxId === card.color));
        }
        return cards;
    }
}
