import { createStore, combineReducers } from 'redux';
import TableReducer from '../reducers/tables.js';
import SelectionReducer from '../reducers/selection.js';



export const ConfigureStore = ()=>{
   const  store=createStore(combineReducers(
        {
            tables:TableReducer,
            selection:SelectionReducer
            
        },
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      // window.__REDUX_DEVTOOLS_EXTENSION__ / window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    ));
    return store;
};


