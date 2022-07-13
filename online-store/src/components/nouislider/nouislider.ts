import './nouislider.css';
import './nouislider.min.css';
import './nouislider.min.js';
import { TargetElement } from '../../types/nouislider_types';
const noUiSlider = require('nouislider');

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

        rangePriceSlider?.noUiSlider?.on('update', function (values, handle) {
            priceInputs[handle].value = ((Math.round(<number>values[handle] * 10) / 10) as unknown) as string;
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

        rangeAmountSlider?.noUiSlider?.on('update', function (values, handle) {
            amountInputs[handle].value = (Math.round(<number>values[handle]) as unknown) as string;
        });
    }
}
