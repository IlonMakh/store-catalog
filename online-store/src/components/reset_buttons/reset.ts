import './reset.css';

export class ResetButtons {
    draw() {
        const sortAndFilter: HTMLElement = document.querySelector('.sorting-and-filter') as HTMLElement;
        const sorting: HTMLElement = document.querySelector('.sorting') as HTMLElement;
        const reset: HTMLElement = document.createElement('div');
        reset.classList.add('reset');
        const resetFilter: HTMLButtonElement = document.createElement('button');
        resetFilter.classList.add('reset-filter');
        const resetSettings: HTMLButtonElement = document.createElement('button');
        resetSettings.classList.add('reset-settings');

        sortAndFilter?.insertBefore(reset, sorting);
        reset.append(resetFilter, resetSettings);
    }
}
