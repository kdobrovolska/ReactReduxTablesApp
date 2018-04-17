const tableReducerDefaultState=[];

export default  (state=tableReducerDefaultState,action)=>{
     switch(action.type){
        case 'ADD_TABLE':
            return addTable(state,action.table,action.afterID);
        case 'ADD_TABLES':
            return action.tables;
      
        case 'REMOVE_TABLE':
              return state.filter(({id})=>{return id!=action.tableID});
        case 'EDIT_TABLE':
           return state.map((item)=>{
               if(item.id===action.tableID)
               {
                   return {...item,...action.table}
               }
               else
               {
                   return item;
               }
            })
        default:
         return state;
    }
};
const addTable=(state,table,afterID)=>
{
  //  if(afterID!=-1)
   //     alert('afterID='+afterID+' ,state.length='+state.length);
    let ar=[];
    if(state.length==0){
        ar.push(table);
    }
    else{
        if(afterID==-1)
        {
            ar.push(table); 
        }
        for(let i=0;i<state.length;i++)
        {
            ar.push(state[i]);
            if(state[i].id==afterID)
            {
                ar.push(table);
            }
        }
   }
   console.log(ar);
   return ar;
}