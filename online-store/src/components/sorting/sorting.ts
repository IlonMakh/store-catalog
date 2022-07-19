import { filterControllers, header, socksCatalog } from '../../index';
import { ICardItem } from '../../types/types';
import { catalog } from '../catalog/catalog';
import './sorting.css';

export class Sorting {
    AZ: string;
    ZA: string;
    NEW: string;
    OLD: string;

    constructor() {
        this.AZ = 'az';
        this.ZA = 'za';
        this.NEW = 'new';
        this.OLD = 'old';
    }

    draw() {
        const filterAndSorting: HTMLElement = document.querySelector('.sorting-and-filter') as HTMLElement;
        const filter: HTMLElement = document.querySelector('.filter') as HTMLElement;
        const sortingBlock: HTMLElement = document.createElement('div') as HTMLElement;

        sortingBlock.classList.add('sorting');
        sortingBlock.innerHTML = `
            <h6>Sort by</h6>
            <select class='sorting_select' name='sorting[]'>
                <option disabled selected>Choose sorting</option>
                <option value='${this.AZ}'>Sort alphabetically (from A to Z)</option>
                <option value='${this.ZA}'>Sort alphabetically (from Z to A)</option>
                <option value='${this.NEW}'>Sort by release year (newest first)</option>
                <option value='${this.OLD}'>Sort by release year (oldest first)</option>
            </select>
        `;

        filterAndSorting.insertBefore(sortingBlock, filter);
        const selector: HTMLSelectElement = document.querySelector('.sorting_select') as HTMLSelectElement;
        selector.addEventListener('change', function () {
            socksCatalog.draw(filterControllers.allFilters(catalog));
            header.addToCart();
        });
    }

    sort(cards: ICardItem[]) {
        const selector: HTMLSelectElement = document.querySelector('.sorting_select') as HTMLSelectElement;

        switch (selector.value) {
            case this.AZ:
                return cards.sort((a, b) => (a.name > b.name ? 1 : -1));
            case this.ZA:
                return cards.sort((a, b) => (a.name < b.name ? 1 : -1));
            case this.NEW:
                return cards.sort((a, b) => (a.year < b.year ? 1 : -1));
            case this.OLD:
                return cards.sort((a, b) => (a.year > b.year ? 1 : -1));
            default:
                return cards;
        }
    }
}
