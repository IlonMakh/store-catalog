import { modal } from '../index';

class LocalStorage {
    productsList: string;

    constructor() {
        this.productsList = 'socks';
    }

    getProducts() {
        const productsLocalStorage: string | null = localStorage.getItem(this.productsList);
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage);
        }
        return [];
    }

    putProducts(name: string) {
        const socks: string[] = this.getProducts();
        const index: number = socks.indexOf(name);
        let pushProduct = false;

        if (socks.length < 20) {
            if (index === -1) {
                socks.push(name);
                pushProduct = true;
            } else {
                socks.splice(index, 1);
            }
        } else if (socks.length === 20) {
            if (index === -1) {
                modal.draw();
            } else {
                socks.splice(index, 1);
            }
        }

        localStorage.setItem(this.productsList, JSON.stringify(socks));
        return { pushProduct, socks };
    }
}

export const localStorageUtil = new LocalStorage();
