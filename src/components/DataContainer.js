import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {EditScrollToID,EditOutline,ClearOutline, SetError} from '../actions/selection.js';
import {startWebSocket, sendData} from '../WebSockets/webSockets.js';
import Tables from './Tables.js';
import Panel1 from './Panel.js';
import TransformTable from './TransformTable.js';

class DataContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={  reg:' '};
    }
    
    componentDidMount=()=>
    {
        startWebSocket(); 
    }

    componentWillUnmount=()=>
    {
         this.WebSocket.close();
    }
   
    tryAddTable=(table,afterIDString)=>
    {
        const afterId=parseInt(afterIDString,10);
        const data={$type:'add_table',after_id:afterId, table:{name:table.name, participants:table.participants}} ;
        sendData(data);
       // this.setState(()=>({reg:' ',outline:{id:afterIDString,type:0}, scrollToID:afterIDString}));
       this.setState(()=>({ reg:' '}));
       this.props.dispatch(ClearOutline());
       this.props.dispatch(EditScrollToID(afterId));
    }

    tryRemoveTable=(selectTableIDString)=>
    {
        const id=parseInt(selectTableIDString, 10);
        const data={$type:'remove_table',id:id} ;
       // this.setState(()=>({ reg:' ',outline:{id:id,type:1}}));
       this.setState(()=>({ reg:' '}));
       this.props.dispatch(EditOutline(id,1));
       sendData(data); 
    
    }

    tryUpdateTable=(table,selectTableIDString)=>
    {
        const id=parseInt(selectTableIDString, 10);
        const data={$type:'update_table',table:{id:id, name:table.name, participants:table.participants}} ;
       // this.setState(()=>({ reg:' ',outline:{id:id,type:1}}));
       this.setState(()=>({ reg:' '}));
       this.props.dispatch(EditOutline(id,1));
        sendData(data);
    }

   

    changeRegime=(type)=>
    {
        this.setState(()=>({reg:type}));
    }
  
    clearError=()=> 
    {
       // this.setState(()=>({error:''})); 
       this.props.dispatch(SetError(''));
    }
    
    render()
    { 
         return <div className='main'>
            <Tables />
            
            <Panel1 changeRegime={this.changeRegime} reg={this.state.reg}/>
             
            {(this.state.reg!=' ' ) &&  
                <TransformTable addTable={this.tryAddTable} updateTable={this.tryUpdateTable}
                    removeTable={this.tryRemoveTable} changeRegime={this.changeRegime} 
                    regime={this.state.reg} />
            }
          
            {(this.props.error.length>0)&&
                <div className='message message-error'> {this.props.error}
                  <div>  <button className='button_common form-group-add' onClick={this.clearError}>OK</button> </div>
                </div>
            }
        </div>;
     
    }
}
const mapStateToProps=(state)=>
{
    return{
        error:state.selection.error
    };
};

export default connect(mapStateToProps)(DataContainer);