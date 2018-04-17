import React from 'react';
//import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';


const  Header= () => (
    <header>
      <h1>Expensify app</h1>
      <NavLink to='/edit' activeClassName='is-active'>Edit Expense Page </NavLink>
      <NavLink to='/add' activeClassName='is-active'>Add Expense Page </NavLink>
      <NavLink to='/help' activeClassName='is-active' >Help </NavLink>
      <NavLink to='/' activeClassName='is-active' exact={true}>Dashboard </NavLink>
    </header>
  );
 export default Header;