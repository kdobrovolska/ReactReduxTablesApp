import React from 'react'

const EditExpensePage = (props) => {
  console.log(props);
  return <div>
    Edit expense component with ID ={props.match.params.id}
  </div>
};
export default EditExpensePage;