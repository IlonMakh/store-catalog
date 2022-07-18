import { filterControllers, header, nouislider, socksCatalog, sorting } from '../../index';
import { ICardItem } from '../../types/types';
import { catalog } from '../catalog/catalog';
import './filter.css';

export class Filter {
    draw() {
        const htmlSorting = `
            <div class='filter'>
                <div class='filter_collection'>
                    <h6>Collection</h6>
                    <select class='collection_select' name='collection[]'>
                        <option selected>No collection</option>
                        <option value='Superhero workdays'>Superhero workdays</option>
                        <option value='Disney princess dream'>Disney princess dream</option>
                        <option value='Warm and cozy'>Warm and cozy</option>
                        <option value='Hogwarts school'>Hogwarts school</option>
                        <option value='Christmas morning'>Christmas morning</option>
                        <option value='Colorful mood'>Colorful mood</option>
                        <option value='Summer vibes'>Summer vibes</option>
                    </select>
                </div>
                <div class='filter_size'>
                    <h6>Size</h6>
                    <div class='sizes'>
                        <button class='size-btn'>34</button>
                        <button class='size-btn'>35</button>
                        <button class='size-btn'>36</button>
                        <button class='size-btn'>37</button>
                        <button class='size-btn'>38</button>
                        <button class='size-btn'>39</button>
                        <button class='size-btn'>40</button>
                        <button class='size-btn'>41</button>
                        <button class='size-btn'>42</button>
                        <button class='size-btn'>43</button>
                    </div>
                </div>
                <div class='filter_color'
                    <h6>Color</h6>
                    <div class = 'colors'>
                        <div class='white'>
                            <input type='checkbox' class = 'color_checkbox' id='white'>
                            <label for='white'>white</label>
                        </div>
                        <div class='black'>
                            <input type='checkbox' class = 'color_checkbox' id='black'>
                            <label for='black'>black</label>
                        </div>
                        <div class='red'>
                            <input type='checkbox' class = 'color_checkbox' id='red'>
                            <label for='red'>red</label>
                        </div>
                        <div class='grey'>
                            <input type='checkbox' class = 'color_checkbox' id='grey'>
                            <label for='grey'>grey</label>
                        </div>
                        <div class='blue'>
                            <input type='checkbox' class = 'color_checkbox' id='blue'>
                            <label for='blue'>blue</label>
                        </div>
                        <div class='pink'>
                            <input type='checkbox' class = 'color_checkbox' id='pink'>
                            <label for='pink'>pink</label>
                        </div>
                        <div class='purple'>
                            <input type='checkbox' class = 'color_checkbox' id='purple'>
                            <label for='purple'>purple</label>
                        </div>
                        <div class='yellow'>
                            <input type='checkbox' class = 'color_checkbox' id='yellow'>
                            <label for='yellow'>yellow</label>
                        </div>
                        <div class='green'>
                            <input type='checkbox' class = 'color_checkbox' id='green'>
                            <label for='green'>green</label>
                        </div>
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
            elem.addEventListener('change' || 'load', () => {
                socksCatalog.draw(filterControllers.allFilters(catalog));
                header.addToCart();
            });
        });
    }

    allFilters(cards: ICardItem[]) {
        let filteredCards: ICardItem[] = sorting.sort(cards);
        filteredCards = filterControllers.collectionFilter(filteredCards);
        filteredCards = filterControllers.sizeFilter(filteredCards);
        filteredCards = filterControllers.newFilter(filteredCards);
        filteredCards = filterControllers.colorFilter(filteredCards);
        filteredCards = nouislider.priceRange(filteredCards);
        filteredCards = nouislider.amountRange(filteredCards);
        return filteredCards;
    }

    collectionFilter(cards: ICardItem[]) {
        const selector: HTMLSelectElement = document.querySelector('.collection_select') as HTMLSelectElement;
        const filteredCards: ICardItem[] = cards.filter(function (card) {
            return selector.value === 'No collection' ? card : card.collection === selector.value;
        });
        return filteredCards;
    }

    sizeFilter(cards: ICardItem[]) {
        const sizeButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.size-btn');
        const activeBtns: string[] = [];
        let filteredCards: ICardItem[] = [];
        Array.from(sizeButtons).forEach(function (elem) {
            elem.classList.contains('active') ? activeBtns.push(elem.innerHTML) : activeBtns;
            if (activeBtns.length !== 0) {
                filteredCards = cards.filter(function (card) {
                    for (let i = 0; i < activeBtns.length; i++) {
                        if (+activeBtns[i] === card.size) {
                            return true;
                        }
                    }
                });
            } else {
                filteredCards = cards;
            }
        });
        return filteredCards;
    }

    newFilter(cards: ICardItem[]) {
        const checkbox: HTMLInputElement = document.getElementById('new_checkbox') as HTMLInputElement;
        const filteredCards: ICardItem[] = cards.filter(function (card) {
            return checkbox.checked ? card.isNew === true : card;
        });
        return filteredCards;
    }

    colorFilter(cards: ICardItem[]) {
        const clrCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.color_checkbox');
        const activeChbx: string[] = [];
        let filteredCards: ICardItem[] = [];
        Array.from(clrCheckboxes).forEach(function (elem) {
            elem.checked ? activeChbx.push(elem.id) : activeChbx;
            if (activeChbx.length !== 0) {
                filteredCards = cards.filter(function (card) {
                    for (let i = 0; i < activeChbx.length; i++) {
                        if (activeChbx[i] === card.color) {
                            return true;
                        }
                    }
                });
            } else {
                filteredCards = cards;
            }
        });
        return filteredCards;
    }
}
