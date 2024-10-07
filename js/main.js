import {attach} from '../store.js';
import App from '../component/App.js'

const root = document.getElementById('root');
attach(App, root);