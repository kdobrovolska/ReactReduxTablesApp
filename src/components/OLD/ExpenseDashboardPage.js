import React from 'react';
import ExpenseList from './ExpenseList.js'
import ExpenseListFilters from './ExpenseListFilters.js'

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilters />
    <ExpenseList type='new'/>
  </div>
);
export default ExpenseDashboardPage;