import { Header } from './components/header/header';
import { Socks } from './components/catalog/catalogView';
import { Search } from './components/search/search';
import './index.css';
import { localStorageUtil } from './storages/localStorage';

const socksCatalog = new Socks();
socksCatalog.draw();

const searchInput = new Search();
searchInput.draw();
searchInput.search();

export const header = new Header();
header.draw(localStorageUtil.getProducts().length);
header.addToCart();
