import React from 'react';
import moment from 'moment';
//import {SingleDatePicker} from 'react-dates';
//import 'react-dates/lib/css/_datepicker.css';

export default class ExpenseForm extends React.Component
{
    state={description:'',note:'', amount:'',createdAt:moment()};
    DescriptionChanged=(e)=>
    {
        
        const description=e.target.value;
      //  alert(description);
        this.setState(()=>({description}));
    }
    NoteChanged=(e)=>
    {
        e.persist();
         this.setState(()=>({note:e.target.value}));
    }
    AmountChanged=(e)=>
    {
        
        const amount=e.target.value;
        if(amount.match(/^\d*(\.\d{0,2})?$/)){
            this.setState(()=>({amount}));
        }
    }
    render()
    {
      return  <div>
        <input type='text' 
            placeholder='Description' 
            autoFocus
            value={this.state.description}
            onChange={this.DescriptionChanged}
            />
        <input type='text' 
            placeholder='Amount' 
            value={this.state.amount}
            onChange={this.AmountChanged}
            />
        <p></p>
        <textarea placeholder='Add note' 
        value={this.state.note}
            onChange={this.NoteChanged}
        ></textarea>
        </div>;
    }
}