import { filterControllers, header, nouislider, resetButtons, socksCatalog, sorting } from '../../index';
import { localStorageUtil } from '../../storages/localStorage';
import { catalog } from '../catalog/catalog';
import './reset.css';

export class ResetButtons {
    draw() {
        const sortAndFilter: HTMLElement = document.querySelector('.sorting-and-filter') as HTMLElement;
        const sortingBlock: HTMLElement = document.querySelector('.sorting') as HTMLElement;
        const reset: HTMLElement = document.createElement('div');
        reset.classList.add('reset');
        const resetFilter: HTMLButtonElement = document.createElement('button');
        resetFilter.classList.add('reset-filter');
        const resetSettings: HTMLButtonElement = document.createElement('button');
        resetSettings.classList.add('reset-settings');

        sortAndFilter?.insertBefore(reset, sortingBlock);
        reset.append(resetFilter, resetSettings);

        resetSettings.addEventListener('click', function () {
            localStorage.clear();
            header.draw(localStorageUtil.getProducts().length);
            filterControllers.draw();
            sorting.draw();
            nouislider.draw();
            resetButtons.draw();
            socksCatalog.draw(catalog);
            header.addToCart();
        });

        resetFilter.addEventListener('click', function () {
            header.draw(localStorageUtil.getProducts().length);
            filterControllers.draw();
            sorting.draw();
            nouislider.draw();
            resetButtons.draw();
            socksCatalog.draw(sorting.sort(catalog));
            header.addToCart();
        });
    }
}
