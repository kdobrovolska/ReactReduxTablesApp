import {createStore} from 'redux';
console.log('redux');
/*const incrementCount=(payload={})=>{
    return {
        type:'INCREMENT',
        incrementBy: ( (typeof payload.incrementBy ==='number')?payload.incrementBy:1)
    };
};*/
const incrementCount=({incrementBy=1}={})=>{
    return {
        type:'INCREMENT',
        incrementBy
    };
};
const decrementCount=({decrementBy=1}={})=>{
    return {
        type:'DECREMENT',
        decrementBy
    };
};
const reset=()=>{
    return {
        type:'RESET'
     };
};
const set=({count})=>{
    return {
        type:'SET',
        count
     };
};
const reducer=(state={count:0},action)=>{

    console.log('running');
    switch(action.type)
    {
        case 'INCREMENT':
            // const incrementBy=( (typeof action.incrementBy ==='number')?action.incrementBy:1);
           // return {
           //     count:state.count+incrementBy
           // };
            return {
               count:state.count+action.incrementBy
            };
        case 'DECREMENT':
             return {
                count:state.count-action.decrementBy
            };
        case 'SET':
            return {
                count:action.count
            };
        case 'RESET':
            return {
                count:0
            };
        default :
            return state;    
    }
};
const store=createStore(reducer);
    

//store.dispatch({type:'INCREMENT', incrementBy:2});
//store.dispatch({type:'INCREMENT'});
const unsubscribe=store.subscribe(()=>{console.log(store.getState())})
store.dispatch(incrementCount({ incrementBy:11}));
store.dispatch(incrementCount());
//unsubscribe();
store.dispatch(decrementCount({ decrementBy:2}));
store.dispatch(decrementCount());
store.dispatch({type:'RESET'});
store.dispatch(set({ count:104}));

