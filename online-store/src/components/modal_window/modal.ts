import './modal.css';

export class ModalWindow {
    draw() {
        const main: HTMLElement = document.querySelector('main') as HTMLElement;
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = 'Sorry, the number of items exceeded 20.<br>Cart is full.';
        main.append(modal);

        setTimeout(() => {
            main.removeChild(modal);
        }, 4000);
    }
}
