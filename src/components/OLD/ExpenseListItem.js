import React from 'react'
import {connect} from 'react-redux';
import {RemoveExpense} from '../actions/expenses.js'
//import {Dispatch} from '../app.js'

const ExpenseListItem=({dispatch ,id,description, createdAt,amount})=>
(
    <div>
    <h1> Item ID={id}</h1>
    <h3> Descrioption: {description}</h3>
    <h3> Created At:{createdAt}</h3>
    <h3> Amount:{amount}</h3>
    <button onClick={()=>{
        dispatch(RemoveExpense(id));
     //  Dispatch(RemoveExpense(id));
    }}>Remove </button>
    </div>
);


export default connect()(ExpenseListItem);