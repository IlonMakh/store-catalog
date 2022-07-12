class LocalStorage {
    keyName: string;

    constructor() {
        this.keyName = 'socks';
    }

    getProducts() {
        const productsLocalStorage: string | null = localStorage.getItem(this.keyName);
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

        localStorage.setItem(this.keyName, JSON.stringify(socks));

        return { pushProduct, socks };
    }
}

export const localStorageUtil = new LocalStorage();
