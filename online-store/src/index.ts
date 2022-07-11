import { Socks } from './components/catalog/catalogView';
import { Search } from './components/search/search';
import './index.css';

const socksCatalog = new Socks();
socksCatalog.draw();

const searchInput = new Search();
searchInput.draw();
searchInput.search();
