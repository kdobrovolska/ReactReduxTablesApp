
import {AddTable,AddTables,RemoveTable,EditTable} from  '../actions/tables.js'
import {EditOutlineType, SetError} from '../actions/selection.js'

import {Dispatch} from '../app.js'


let webSocket;
let wasPong=true;
let error='';
let TimerNumber=0;  
export const startWebSocket=()=>
{
    webSocket = new WebSocket("wss://js-assignment.evolutiongaming.com/ws_api");
    webSocket.onopen = function()
    {
        const ff={
            "$type": "login",
            "username": "user1234",
            "password": "password1234"
        };
       sendData(ff);
    };
    webSocket.onmessage = function (evt) 
    { 
        const received_msg = evt.data;
        let dataParsed=JSON.parse(received_msg);
        workReceivedData(dataParsed);     
    };
    window.setInterval(timerFun, 1000);
}
export const sendData=(data)=>
{
    const str=JSON.stringify(data);
    webSocket.send(str); 
}
const workReceivedData=(data)=>
{
    if(data.$type=='login_successful')
    {
        if(data.user_type=='admin')
        {
            const ff={"$type": "subscribe_tables"};
            sendData(ff);
        }
        AddToReceived(data.$type +':'+data.user_type);
    }
    else if(data.$type=='table_list')
    {
        addReceivedTables(data.tables);
        AddToReceived(data.$type +':'+data.tables.length);
    }
    else if(data.$type=='table_added')
    {
        addReceivedTable(data.table,data.after_id);
        AddToReceived(data.$type +':'+data.table.name+',id='+data.table.id+'afterID='+data.after_id);
    }
    else if(data.$type=='table_updated')
    {
        updateReceivedTable(data.table);
        AddToReceived(data.$type +':'+data.table.name);
    }
    
    else if(data.$type=='table_removed')
    {
        removeTable(data.id);
        AddToReceived(data.$type +':'+data.id);
        
    }
    else if(data.$type=='removal_failed')
    {
        Dispatch(EditOutlineType(2));
        Dispatch(SetError('The table was not removed with ID '+data.id));
        AddToReceived(data.$type +':'+data.id);
    }
    else if(data.$type=='update_failed')
    {
        Dispatch(EditOutlineType(2));
        Dispatch(SetError('The table was not updated with ID '+data.id));
        AddToReceived(data.$type +':'+data.id);
    }
    else if(data.$type=='pong')
    {
        wasPong=true;
    }
    else if(data.$type=='not_authorized')
    {
        Dispatch(SetError('You are not authorized '));
        AddToReceived(data.$type );

    }
    else
    {
        AddToReceived(data.$type +'unknown');
    }
    
}

const AddToReceived=(str)=>
{
    /* let ar=this.state.received;
    ar.splice(0,1);
    ar.push(str);
    this.setState(()=>({received:ar}));
    */
}
const addReceivedTable=(obj,idAfter)=>
{
    Dispatch(AddTable(idAfter,obj));
}

const updateReceivedTable=(obj)=>
{
        Dispatch(EditTable(obj.id,obj));
}

const addReceivedTables=(tables)=>
{
  console.log('addReceivedTables');
  console.log(tables);
        Dispatch(AddTables(tables));
}
const removeTable=(id)=>
{
   // alert('remove table');
    Dispatch(RemoveTable(id));
}

const timerFun=()=>
{
    if(wasPong==false)
    {
        error='Connection with server was lost';
    }
    
    const ff={
        "$type": "ping",
        "seq":1
    }
    wasPong=false;
    sendData (ff);
    TimerNumber++;
    if(TimerNumber%60==0)
    {
        TimerNumber=0;
    }
}

