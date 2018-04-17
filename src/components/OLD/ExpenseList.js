import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem.js'
import VisibleExpenses from '../selectors/expenses.js'

const ExpenseList=(props)=>
(
    <div>
    <h1> Expence List  </h1>
     {props.expenses.map((item,ident)=>{
         
         return <ExpenseListItem key={ident} {...item}/>
    })}
    </div>
);
// first variant
//const ConnectedExpenseList=connect((st)=>{
  //  return {
  //      expenses:st.expenses
  //  };
//})(ExpenseList);
//export default ConnectedExpenseList;

const mapStateToProps=(state)=>
{
    return{
        expenses:VisibleExpenses(state.expenses,state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);