
export interface ICardItem {
    image: string,
    name: string,
    amount: number,
    year: number,
    collection: string,
    color: string,
    price: number,
    size: number,
    isNew: boolean,
    isChosen: boolean,
    isHide: boolean
};

export interface IFilter {
    collection?: string,
    size?: number,
    color?: string[],
    new?: boolean,
    price?: string[],
    amount?: string[]
}