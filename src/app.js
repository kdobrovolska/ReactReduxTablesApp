import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter.js'
import {ConfigureStore} from './store/configureStore.js'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import {AddTable} from  './actions/tables.js'
import DataContainer from './components/DataContainer.js';

const store=ConfigureStore();
//console.log(store.getState());

export const Dispatch =(action)=>{
    store.dispatch(action);
 
}


const jsx=(
    <Provider store={store}>
    <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
