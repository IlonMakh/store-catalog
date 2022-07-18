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

            if (searchValue != '') {
                searchingItems.forEach(function (elem: HTMLElement) {
                    if (
                        (<HTMLElement>elem.querySelector('.item_name')).innerText.toLowerCase().search(searchValue) ==
                        -1
                    ) {
                        elem.classList.add('hide');
                    } else {
                        elem.classList.remove('hide');
                    }
                });
            } else {
                searchingItems.forEach(function (elem: HTMLElement) {
                    elem.classList.remove('hide');
                });
            }

            if (document.querySelectorAll('.hide').length == document.querySelectorAll('.catalog_item').length) {
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
