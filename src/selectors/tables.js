export const GetScrollToIDTable=(tables,selection)=>
{
   return tables.filter((item)=>{
         return item.id ===selection.scrollToID;
   });
}
export const GetOutlineTable=(tables,selection)=>
{
   return tables.filter((item)=>{
         return item.id ===selection.outline.id;
    });
}