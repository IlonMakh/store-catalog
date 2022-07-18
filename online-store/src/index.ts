import { Header } from './components/header/header';
import { Socks } from './components/catalog/catalogView';
import { Search } from './components/search/search';
import './index.css';
import { localStorageUtil } from './storages/localStorage';
import { Filter } from './components/filter/filter';
import { NoUiSlider } from './components/nouislider/nouislider';
import { Sorting } from './components/sorting/sorting';
import { catalog } from './components/catalog/catalog';
import { ModalWindow } from './components/modal_window/modal';
import { ResetButtons } from './components/reset_buttons/reset';

export const filterControllers = new Filter();
filterControllers.draw();

export const nouislider = new NoUiSlider();
nouislider.draw();
export const sorting = new Sorting();
sorting.draw();

export const socksCatalog = new Socks();
socksCatalog.draw(catalog);

export const searchInput = new Search();
searchInput.draw();
searchInput.search();

export const header = new Header();
header.draw(localStorageUtil.getProducts().length);
header.addToCart();

export const modal = new ModalWindow();

export const resetButtons = new ResetButtons();
resetButtons.draw();

console.log(`
Чтобы увидеть полную информацию о товаре, нужно навести курсор на название товара.    
Частично реализованные пункты ТЗ: 1)Сохранение настроек в localstorage - сохраняются элементы, добавленные в корзину.
Фильтрация и сортировка при перезагрузке страницы не сохраняются. (-20);
Все остальные пункты ТЗ выполнены. Предварительная оценка 180/200.
`);
