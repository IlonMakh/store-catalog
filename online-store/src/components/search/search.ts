import { searchInput } from '../../index';
import './search.css';

export class Search {
    draw() {
        const input: HTMLElement = document.createElement('input');
        input.setAttribute('type', 'search');
        input.setAttribute('autofocus', 'autofocus');
        input.setAttribute('placeholder', 'Type something...');
        input.classList.add('search_input');
        (<HTMLElement>document.querySelector('.search_wrapper')).append(input);
    }

    search() {
        const input: HTMLInputElement = document.querySelector('.search_input') as HTMLInputElement;
        input.addEventListener('input', function () {
            const searchValue: string = input.value.trim().toLowerCase();
            const searchingItems: NodeListOf<HTMLElement> = document.querySelectorAll('.catalog_item');

            if (searchValue) {
                searchingItems.forEach((elem) => {
                    const itemName = (<HTMLElement>elem.querySelector('.item_name')).innerText.toLowerCase();
                    if (itemName.includes(searchValue)) {
                        elem.classList.remove('hide');
                    } else {
                        elem.classList.add('hide');
                    }
                });
            } else {
                searchingItems.forEach((elem) => elem.classList.remove('hide'));
            }

            if (document.querySelectorAll('.hide').length == searchingItems.length) {
                searchInput.noResult();
            } else {
                (<HTMLElement>document.querySelector('.no-result-msg')).remove();
            }
        });
    }

    noResult() {
        if (!document.querySelector('.no-result-msg')) {
            const noResultMsg: HTMLElement = document.createElement('div');
            noResultMsg.classList.add('no-result-msg');
            noResultMsg.innerHTML = `Sorry, now we don't have the product you are looking for...`;
            (<HTMLElement>document.querySelector('.catalog_wrapper')).append(noResultMsg);
        }
    }
}
