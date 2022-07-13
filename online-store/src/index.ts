import { Header } from './components/header/header';
import { Socks } from './components/catalog/catalogView';
import { Search } from './components/search/search';
import './index.css';
import { localStorageUtil } from './storages/localStorage';
import { Filter } from './components/filter/filter';
import { NoUiSlider } from './components/nouislider/nouislider';

const socksCatalog = new Socks();
socksCatalog.draw();

const searchInput = new Search();
searchInput.draw();
searchInput.search();

export const header = new Header();
header.draw(localStorageUtil.getProducts().length);
header.addToCart();

const filterControllers = new Filter();
filterControllers.draw();
filterControllers.collectionFilter();

const nouislider = new NoUiSlider();
nouislider.draw();
