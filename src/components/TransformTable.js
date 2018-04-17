import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {EditScrollToID,EditOutline} from '../actions/selection.js';


class TransformTable extends React.Component
{
    MAXParticipants=12;

    constructor(props)
    {
        super(props);
        this.state={error:['','']};
    }

    componentDidUpdate=()=>
    {
        let name=this.getDefaultValue('name');
        if(this.props.selectedTableID>=0 && this.props.regime=='u')
        {
            
            const elements=document.getElementsByName('tableName');
            const elements1=document.getElementsByName('participants');
            if(elements!=null && elements.length>0 && elements1!=null && elements1.length>0)
            {
                const textCurrent=elements[0].value;
                if(textCurrent!=name)
                {
                    elements[0].value=name;
                    elements1[0].value=this.getDefaultValue('participants');
                }
            }
        }
    }
   
   
    checkError=(e)=>
    {
        let ar=['',''];
        let num=0;
        if(e.target.elements.tableName.value.length==0)
        {
             ar[0]='Name is empty';
        }
        if(e.target.elements.participants.value.length==0)
            ar[1]='Participants is empty';
        else
        {
            try{
                  num=parseInt(e.target.elements.participants.value.toString(),10);
            }
            catch(e){
                ar[1]='Participants should be INT'  ;        
            }
        }
        this.setState(()=>({error:ar}));
        return ar;
    }
   
    handleSubmit=(e)=>
    {
        e.preventDefault();
        if(this.props.regime=='r')
        {
            const selectTable= e.target.elements.selectTable.value;
            if(!(selectTable==null || selectTable.length==0))
                 this.props.removeTable(selectTable); 
            return;     
        }
        if(this.props.regime=='a' || this.props.regime=='u')
        {
            const error=this.checkError(e);
            if(error[0].length==0 && error[1].length==0 )
            {
                const num=parseInt(e.target.elements.participants.value.toString(),10);
                const table={name:e.target.elements.tableName.value,
                    w: 0,
                    h: 0,
                    fSize:0,
                    participants: num%(this.MAXParticipants+1)
                }
                if(this.props.regime=='a')
                {
                    const afterID= e.target.elements.afterID.value;
                    if(afterID==null || afterID.length==0)
                        this.props.addTable(table,0);
                    else
                        this.props.addTable(table,afterID); 
                }
                if(this.props.regime=='u')
                {
                    const selectTable= e.target.elements.selectTable.value;
                    if(!(selectTable==null || selectTable.length==0))
                        this.props.updateTable(table,selectTable); 
                }
            }
        }
    }

    getOptions=()=>
    {
         if(this.props.tables==null) 
            return [];
        return this.props.tables.map((table,index) =>{ 
            return <option value={table.id} key={index}>{table.id+':'+table.name}</option>;
        });
    }

    getError=(n)=>{ return(this.state.error[n].length>0)?<div className='pad err'>{this.state.error[n]}</div>:''; }

    cancel=()=>{
       this.props.changeRegime(' ');
    }

    selectedTableWasChanged=()=>
    {
        this.TableWasChanged('selectTable');
    }

    afterIDWasChanged=()=>
    {
        this.TableWasChanged('afterID'); 
    }

    TableWasChanged=(name)=>
    {
        const IDSElected=document.getElementsByName(name)[0].value;
        if(this.props.regime=='u')
        {   
            for(let i=0;i<this.props.tables.length;i++)
            {
                if(this.props.tables[i].id==IDSElected)
                {
                    document.getElementsByName('tableName')[0].value=this.props.tables[i].name; 
                    document.getElementsByName('participants')[0].value=this.props.tables[i].participants; 
                }
            }
        }
        //this.props.changeScrollToID(IDSElected,3);
        this.props.dispatch(EditScrollToID(IDSElected));
        this.props.dispatch(EditOutline(IDSElected,3));
    }

    getDefaultValue(type)
    {
        let num=0;
        if(this.props.selectedTableID>=0)
        {
            for(let i=0;i<this.props.tables.length;i++)
            {
                if(this.props.tables[i].id==this.props.selectedTableID)
                {
                    num=i;
                    break;
                }
            }
        }
        if(type=='name')
        {
            if( this.props.tables.length>0)
            { 
                 return this.props.tables[num].name;
            }
        }

        if(type=='participants')
        {
            if(this.props.regime=='u'&& this.props.tables.length>0)
                return this.props.tables[num].participants;
        }
        return '';
    }
    
    getTextButton()
    {
        switch  (this.props.regime){
            case 'a': return 'Add';
            case 'u': return 'Update';
            case 'r': return 'Remove';
        }
    }

    render()
    {
        let val='';
        if(this.props.selectedTableID>=0)
            val=this.props.selectedTableID;
        return <div className="container ">
        <form onSubmit={this.handleSubmit} className="form-horizontal form_container">
          
            {(this.props.regime=='u' || this.props.regime=='r') && 
                <div className='form-group form-group-add pad'>
                    <label className="control-label col-sm-2" htmlFor="selectTable">Select Table: </label>
                    <div className="col-sm-10">
                        <select name='selectTable' id="selectTable" className='form-control' 
                                onChange={this.selectedTableWasChanged} value={val}>
                                {  this.getOptions()}   </select>
                    </div>
                </div>
            }
            {(this.props.regime=='u' || this.props.regime=='a') && 
                <div>
                    <div className='form-group form-group-add pad'>
                        <label className="control-label col-sm-2" htmlFor="tableName">Name: </label>
                        <div className="col-sm-10">
                            {( this.props.regime=='u') && 
                                <input name='tableName' id="tableName" type="text" className='form-control ' 
                                    defaultValue={this.getDefaultValue('name')} />}
                            {( this.props.regime=='a') && 
                                <input name='tableName' id="tableName" type="text" className='form-control '/>  }    
                        </div> 
                        <div className="col-sm-offset-2 col-sm-10 pad">  
                            {this.getError(0)}
                        </div>
                    </div>
                    <div className='form-group form-group-add pad' >
                        <label className="control-label col-sm-2" htmlFor="participants">Participants:</label>
                        <div className="col-sm-10">
                            {( this.props.regime=='u') && 
                                <input name='participants'  id="participants" type="text"  className='form-control'
                                defaultValue={this.getDefaultValue('participants')}  />}
                            {( this.props.regime=='a') && 
                                <input name='participants'  id="participants" type="text"  className='form-control ' />}
                        </div>
                        <div className="col-sm-offset-2 col-sm-10 pad"> 
                            {this.getError(1)} 
                        </div>
                    </div>
                </div>
            }   
            
            {(this.props.regime=='a') && 
                <div className='form-group form-group-add pad'>
                    <label className="control-label col-sm-2" htmlFor="afterID" >After ID: </label>
                    <div className="col-sm-10">
                        <select name='afterID' id="afterID" className='form-control ' 
                            onChange={this.afterIDWasChanged} value={val}>
                        {  this.getOptions()}   </select>
                    </div>
                </div>
            }
            <div  className='form-group'> 
                <div className="col-sm-offset-2 col-sm-10">
                        <button className='button_common ' onClick={this.cancel}>Cancel </button>
                        <button className='button_common ' > { this.getTextButton()}</button>
                </div>
            </div>
           
         </form>
        </div>;
    }
   
}
const mapStateToProps=(state)=>
{
    return{
        tables:state.tables,
        selectedTableID:state.selection.outline.id
    };
};

export default connect(mapStateToProps)(TransformTable);
//export default TransformTable;