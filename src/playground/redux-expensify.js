import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
import { WSAEINVALIDPROCTABLE } from 'constants';

const tableReducerDefaultState=[];

const TableReducer=(state=tableReducerDefaultState,action)=>{
     switch(action.type){
        case 'ADD_TABLE':
            return [...state,action.table];
        case 'REMOVE_TABLE':
              return state.filter(({id})=>{return id!=action.tableID});
        case 'EDIT_TABLE':
           return state.map((item)=>{
               if(item.id===action.tableID)
               {
                   return {...item,...action.table}
               }
               else
               {
                   return item;
               }
            })
        default:
         return state;
    }
};
const selectionDefaultState={
    scrollToID: -1,
    outline:{id: -1,
            type: -1}
};
const SelectionReducer=(state=selectionDefaultState,action)=>{
    switch(action.type){
        case 'UPDATE_SCROLLTOID':
            return {...state  ,
                scrollToID:action.scrollToID};
        case 'CLEAR_SCROLLTOID':
                return {...state  ,
                    scrollToID:-1};
        case 'UPDATE_OUTLINE':
            return {...state  ,
                outline:{
                    id:action.outlineID,
                    type:action.outlineType}
                }
        case 'CLEAR_OUTLINE':
                return {...state  ,
                    outline:{
                        id:-1,
                        type:-1}
                    }    
        default:
         return state;
    }
};

const store=createStore(combineReducers(
    {
        tables:TableReducer,
        selection:SelectionReducer
    }
));
/*
store.subscribe(()=>{
    const state=store.getState();
    console.log(state);
})
*/



const AddTable=({id,name,participants}={})=>(
    {
        type:'ADD_TABLE',
        table:{id,name,participants}
    }
);
const RemoveTable=(id)=>(
    {
        type:'REMOVE_TABLE',
        tableID:id
    }
);
const EditTable=(id, table={})=>(
    {
        type:'EDIT_TABLE',
        tableID:id,
        table: WSAEINVALIDPROCTABLE
    }
);
const EditScrollToID=( scrollToID)=>(
    {
        type:'UPDATE_SCROLLTOID',
        scrollToID
    }
);
const ClearScrollToID=()=>(
    {
        type:'CLEAR_SCROLLTOID',
    }
);
const EditOutline=( outlineID, outlineType)=>(
    {
        type:'UPDATE_OUTLINE',
        outlineID,
        outlineType
    }
);
const CLearOutline=()=>(
    {
        type:'CLEAR_OUTLINE',
    }
);


/*
const first=store.dispatch(AddExpense({id:uuid(),description:'jjj',amount:3,createdAt:0}));
const delDispatch=store.dispatch(RemoveExpense(first.expense.id));
console.log('delDispatch=');
console.log(delDispatch);
const editDispatch=store.dispatch(EditExpense(second.expense.id,{amount:777}));

*/

const GetScrollToIDTable=(tables,selection)=>
{
   return tables.filter((item)=>{
         return item.id ===selection.scrollToID;
   });
}
const GetOutlineTable=(tables,selection)=>
{
   return tables.filter((item)=>{
         return item.id ===selection.outline.id;
   });
}



store.dispatch(AddTable({id:1,name:'jjj1',participants:1}));
store.dispatch(AddTable({id:2,name:'jjj22',participants:22}));
store.dispatch(AddTable({id:3,name:'jjj333',participants:333}));

store.dispatch(EditOutline(2,3));
const state=store.getState();
console.log(state);//

console.log(GetOutlineTable(state.tables,state.selection));







