import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


class Panel1 extends React.Component
{
    constructor(props)
    {
        super(props);
    }
       
    getStyleButton=(type)=>
    {
         if(type=='a')
        {
            if(this.props.reg==' ')
                return  {opacity: 1};
            else
                return  {opacity: 0.5};
        }
        else
        {
             if(this.props.reg==' ' && this.props.countTables>0)
                return  {opacity: 1};
            else
                return  {opacity: 0.5};
        }
    }
    getDisableButton=(type)=>
    {
        if(type=='a')
        {
            return !(this.props.reg==' ');
        }
        else
        {
             return !(this.props.reg==' ' && this.props.countTables>0)
        }
    }

    changeRegime1=()=>{
        this.props.changeRegime('a');
    }

    changeRegime2=()=>{
        this.props.changeRegime('u');
    }

    changeRegime3=()=>{
        this.props.changeRegime('r');
    }
   
    render(){
       return   <div className='panel panel_add' >  
         <div className='panel-body' >
                <button onClick={this.changeRegime1} className='button_common' 
                    style={this.getStyleButton('a')} disabled={this.getDisableButton('a')}> Add Table</button>
                <button onClick={this.changeRegime2} className=' button_common' 
                    style={this.getStyleButton('u')} disabled={this.getDisableButton('u')}> Update Table</button>
                <button onClick={this.changeRegime3} className=' button_common' 
                    style={this.getStyleButton('r')} disabled={this.getDisableButton('r')}> Remove Table</button>
         </div> </div>;
    }
}
const mapStateToProps=(state)=>
{
    return{
        countTables:state.tables.length
    };
};

export default connect(mapStateToProps)(Panel1);
//export default Panel1;
 