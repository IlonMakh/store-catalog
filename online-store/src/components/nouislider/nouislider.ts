import noUiSlider from 'nouislider';
import './nouislider.css';
import 'nouislider/dist/nouislider.css';
import { TargetElement } from './nouislider_types';
import { ICardItem } from '../../types/types';
import { filterControllers, header, socksCatalog } from '../../index';
import { catalog } from '../catalog/catalog';

export class NoUiSlider {
    draw() {
        const rangePriceSlider: TargetElement = document.querySelector('.price_slider') as TargetElement;
        const priceInputMin: HTMLInputElement = document.querySelector('.price_input-min') as HTMLInputElement;
        const priceInputMax: HTMLInputElement = document.querySelector('.price_input-max') as HTMLInputElement;
        const priceInputs: HTMLInputElement[] = [priceInputMin, priceInputMax];
        const rangeAmountSlider: TargetElement = document.querySelector('.amount_slider') as TargetElement;
        const amountInputMin: HTMLInputElement = document.querySelector('.amount_input-min') as HTMLInputElement;
        const amountInputMax: HTMLInputElement = document.querySelector('.amount_input-max') as HTMLInputElement;
        const amountInputs: HTMLInputElement[] = [amountInputMin, amountInputMax];

        noUiSlider.create(rangePriceSlider, {
            start: [1, 10],
            connect: true,
            step: 0.1,
            range: {
                min: 1,
                max: 10,
            },
        });

        rangePriceSlider?.noUiSlider?.on('update', function (values, handle: number) {
            priceInputs[handle].value = (+values[handle]).toFixed(1);
        });
        rangePriceSlider?.noUiSlider?.on('change', function () {
            socksCatalog.draw(filterControllers.allFilters(catalog));
            header.addToCart();
        });

        noUiSlider.create(rangeAmountSlider, {
            start: [1, 100],
            connect: true,
            step: 1,
            range: {
                min: 1,
                max: 100,
            },
        });

        rangeAmountSlider?.noUiSlider?.on('update', function (values, handle: number) {
            amountInputs[handle].value = `${+values[handle] >> 0}`;
        });
        rangeAmountSlider?.noUiSlider?.on('change', function () {
            socksCatalog.draw(filterControllers.allFilters(catalog));
            header.addToCart();
        });
    }

    priceRange(cards: ICardItem[]) {
        const rangePriceSlider: TargetElement = document.querySelector('.price_slider') as TargetElement;
        const values: string[] = rangePriceSlider.noUiSlider?.get() as string[];
        const filteredCards: ICardItem[] = cards.filter(function (card) {
            return card.price >= +(+values[0]).toFixed(1) && card.price <= +(+values[1]).toFixed(1);
        });
        return filteredCards;
    }

    amountRange(cards: ICardItem[]) {
        const rangeAmountSlider: TargetElement = document.querySelector('.amount_slider') as TargetElement;
        const values: string[] = rangeAmountSlider.noUiSlider?.get() as string[];
        const filteredCards: ICardItem[] = cards.filter(function (card) {
            return card.amount >= +`${+values[0] >> 0}` && card.amount <= +`${+values[1] >> 0}`;
        });
        return filteredCards;
    }
}
