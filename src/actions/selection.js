export const EditScrollToID=( scrollToID)=>(
    {
        type:'UPDATE_SCROLLTOID',
        scrollToID
    }
);
export const ClearScrollToID=()=>(
    {
        type:'CLEAR_SCROLLTOID',
    }
);
export const EditOutline=( outlineID, outlineType)=>(
    {
        type:'UPDATE_OUTLINE',
        outlineID,
        outlineType
    }
);
export const EditOutlineType=( outlineType)=>(
    {
        type:'UPDATE_OUTLINETYPE',
         outlineType
    }
);
export const ClearOutline=()=>(
    {
        type:'CLEAR_OUTLINE'
    }
);
export const SetError=(error)=>(
    {
        type:'SET_ERROR',
        error
    }
);

