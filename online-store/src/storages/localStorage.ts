import { IFilter } from '../types/types';

class LocalStorage {
    productsList: string;
    filter: IFilter;
    /* sorting: string;
    collectionFilter: string;
    sizeFilter: string;
    colorFilter: string;
    priceFilter: string;
    amountFilter: string;*/

    constructor() {
        this.productsList = 'socks';
        this.filter = {};

        /*  this.sorting = 'sorting';
        this.collectionFilter = 'collection';
        this.sizeFilter = 'size';
        this.colorFilter = 'color';
        this.priceFilter = 'price';
        this.amountFilter = 'amount';*/
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

        if (index === -1) {
            socks.push(name);
            pushProduct = true;
        } else {
            socks.splice(index, 1);
        }

        localStorage.setItem(this.productsList, JSON.stringify(socks));
        return { pushProduct, socks };
    }
    /*
    getFilters() {
        const filtersLocalStorage: IFilter | null = localStorage.getItem(this.filter);
        if (filtersLocalStorage !== null) {
            return JSON.parse(filtersLocalStorage);
        }
        return {};
    }*/
    /*
    getSorting() {
        const sortingLocalStorage: string | null = localStorage.getItem(this.sorting);
        if (sortingLocalStorage !== null) {
            return JSON.parse(sortingLocalStorage);
        }
        return '';
    }

    setSort(sortBy: string) {
        let sorting: string = this.getSorting();
        sorting = sortBy;

        localStorage.setItem(this.sorting, JSON.stringify(sorting));
        return sorting;
    }*/
}

export const localStorageUtil = new LocalStorage();
