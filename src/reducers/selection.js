const selectionDefaultState={
  scrollToID: -1,
  outline:{id: -1,
          type: -1},
  error:''
};
export default (state=selectionDefaultState,action)=>{
  switch(action.type){
      case 'UPDATE_SCROLLTOID':
          return {...state  ,
              scrollToID:action.scrollToID};
      case 'CLEAR_SCROLLTOID':
              return {...state  ,
                  scrollToID:-1};
      case 'UPDATE_OUTLINE':
          return {...state  ,
              outline:{
                  id:action.outlineID,
                  type:action.outlineType}
              }
      case 'UPDATE_OUTLINETYPE':
         const outlineNew={...state.outline,
            type:action.outlineType}
        return {...state  ,
            outline:outlineNew
                }; 
      case 'CLEAR_OUTLINE':
              return {...state  ,
                  outline:{
                      id:-1,
                      type:-1}
                  };
      case  'SET_ERROR':
        return {...state  ,
            error:action.error
            };
      default:
       return state;
  }
};
