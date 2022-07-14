import { Header } from './components/header/header';
import { Socks } from './components/catalog/catalogView';
import { Search } from './components/search/search';
import './index.css';
import { localStorageUtil } from './storages/localStorage';
import { Filter } from './components/filter/filter';
import { NoUiSlider } from './components/nouislider/nouislider';
import { Sorting } from './components/sorting/sorting';

export const filterControllers = new Filter();
filterControllers.draw();

const nouislider = new NoUiSlider();
nouislider.draw();
export const sorting = new Sorting();
sorting.draw();

export const socksCatalog = new Socks();
socksCatalog.draw();

export const searchInput = new Search();
searchInput.draw();
searchInput.search();

export const header = new Header();
header.draw(localStorageUtil.getProducts().length);
header.addToCart();
