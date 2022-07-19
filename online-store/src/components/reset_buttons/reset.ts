import { filterControllers, header, nouislider, resetButtons, socksCatalog, sorting } from '../../index';
import { localStorageUtil } from '../../storages/localStorage';
import { ICardItem } from '../../types/types';
import { catalog } from '../catalog/catalog';
import './reset.css';

export class ResetButtons {
    draw() {
        const sortAndFilter: HTMLElement = document.querySelector('.sorting-and-filter') as HTMLElement;
        const sortingBlock: HTMLElement = document.querySelector('.sorting') as HTMLElement;
        const reset: HTMLElement = document.createElement('div');
        const resetFilter: HTMLButtonElement = document.createElement('button');
        const resetSettings: HTMLButtonElement = document.createElement('button');
        function resetFunc(cards: ICardItem[]) {
            header.draw(localStorageUtil.getProducts().length);
            filterControllers.draw();
            sorting.draw();
            nouislider.draw();
            resetButtons.draw();
            header.addToCart();
            socksCatalog.draw(cards);
        }

        resetSettings.classList.add('reset-settings');
        reset.classList.add('reset');
        resetFilter.classList.add('reset-filter');

        sortAndFilter?.insertBefore(reset, sortingBlock);
        reset.append(resetFilter, resetSettings);

        resetSettings.addEventListener('click', function () {
            localStorage.clear();
            resetFunc(catalog);
        });

        resetFilter.addEventListener('click', function () {
            resetFunc(sorting.sort(catalog));
        });
    }
}
