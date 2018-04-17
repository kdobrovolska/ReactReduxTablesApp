export const AddTable=(afterID,{id,name,participants}={})=>(
    {
        type:'ADD_TABLE',
        table:{id,name,participants},
        afterID:afterID
    }
);
export const AddTables=(tables)=>(
    {
        type:'ADD_TABLES',
        tables:tables
    }
);
export const RemoveTable=(id)=>(
    {
        type:'REMOVE_TABLE',
        tableID:id
    }
);
export const EditTable=(idTable, {id,name,participants}={})=>(
    {
        type:'EDIT_TABLE',
        tableID:idTable,
        table: {id,name,participants}
    }
);