import { filterControllers, header, socksCatalog } from '../../index';
import { ICardItem } from '../../types/types';
import { catalog } from '../catalog/catalog';
import './sorting.css';

export class Sorting {
    draw() {
        const filterAndSorting: HTMLElement = document.querySelector('.sorting-and-filter') as HTMLElement;
        const filter: HTMLElement = document.querySelector('.filter') as HTMLElement;
        const sortingBlock: HTMLElement = document.createElement('div') as HTMLElement;
        sortingBlock.classList.add('sorting');
        sortingBlock.innerHTML = `
            <h6>Sort by</h6>
            <select class="sorting_select" name="sorting[]">
                <option disabled selected>Choose sorting</option>
                <option value="Sort alphabetically (from A to Z)">Sort alphabetically (from A to Z)</option>
                <option value="Sort alphabetically (from Z to A)">Sort alphabetically (from Z to A)</option>
                <option value="Sort by release year (newest first)">Sort by release year (newest first)</option>
                <option value="Sort by release year (oldest first)">Sort by release year (oldest first)</option>
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
        let sortedCards: ICardItem[] = [];
        if (selector.value === 'Choose sorting') {
            sortedCards = cards;
            return sortedCards;
        } else if (selector.value === 'Sort alphabetically (from A to Z)') {
            sortedCards = cards.sort((a, b) => (a.name > b.name ? 1 : -1));
            return sortedCards;
        } else if (selector.value === 'Sort alphabetically (from Z to A)') {
            sortedCards = cards.sort((a, b) => (a.name < b.name ? 1 : -1));
            return sortedCards;
        } else if (selector.value === 'Sort by release year (newest first)') {
            sortedCards = cards.sort((a, b) => (a.year < b.year ? 1 : -1));
            return sortedCards;
        } else if (selector.value === 'Sort by release year (oldest first)') {
            sortedCards = cards.sort((a, b) => (a.year > b.year ? 1 : -1));
            return sortedCards;
        }
        return sortedCards;
    }
}
