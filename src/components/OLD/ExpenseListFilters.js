import React from 'react';
import {connect} from 'react-redux';
import {UpdateTextFilter,SortByAmount,SortByDate} from '../actions/filters.js';

const ExpenseListFilters=(props)=>
{
    return <div>
    <h1>Filter: </h1>
    <input type='text' value={props.filter.text} onChange={(e)=>{
        props.dispatch(UpdateTextFilter(e.target.value));
    }} />
    <select value={props.filter.sortBy} onChange={(e)=>{
     //   alert(props.filter.sortBy);
        if(e.target.value==='amount')
            props.dispatch(SortByAmount());
        else
            props.dispatch(SortByDate());

    }}>
        <option>amount</option>
        <option>date</option>
    </select>
    </div>
};

const MapStoreToProps=(state)=>
{
    return { filter:state.filters};
}

export default connect(MapStoreToProps)(ExpenseListFilters);
