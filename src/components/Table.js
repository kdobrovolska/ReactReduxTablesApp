import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {EditOutline} from '../actions/selection.js';

class Table extends React.Component
{
    constructor(props)
    {
        super(props);
    }
  
    getImages=(participants)=>
    {
        let ar=[];
        let i;
        for( i=0;i<12;i++)
        {
          const name=(i<participants)?"face1n.png":"face2n.png";
          ar.push(<div className='img-table' key={i}><img src={name} alt="no" className='img-one'/></div>);
        }
        return ar;
    }

    getStyle(fSize)
    {
      const w=this.props.w;
      const h=this.props.h;
      let margX=this.props.marginXDefault;
      if(this.props.marginX!='no')
        margX=this.props.marginX.toString();
      let outline='0px dotted green';
      if(this.props.outline.id==this.props.id)
      {
        if(this.props.outline.type==1)
          outline='7px solid green' ;
        else if(this.props.outline.type==2)
          outline='7px solid red' ;
        else if(this.props.outline.type==3)
          outline='7px solid blue' ; 
      }
      return {width:w+'px',height:h+'px', 
        fontSize:fSize+'px', margin:this.props.marginXDefault+' '+this.props.marginXDefault+' '+ 
            this.props.marginXDefault+' '+ margX, outline:outline};
    }

    click=()=>
    {
       this.props.dispatch(EditOutline(this.props.id,3));
    }

    render()
    {
        const h=this.props.h;
        let lh=h/100*40;
        const fSize=this.props.fSize;
        lh=fSize*1.3;
      //  alert('tooltiptext='+this.props.tooltiptext+" w="+this.props.w);
    
       return  <div  className='table' id={this.props.id.toString()} style={this.getStyle(fSize)} onClick={this.click}>
            <div className='text-table' style={{lineHeight:lh+'px',fontSize:fSize}}> {this.props.text}</div>
            <div className='low-table'>
                <div className='imgContainerBorder-table'> 
                  <div className='imgContainer-table'>
                  {
                    this.getImages(this.props.participants)
                  }
                    
                  </div>
              </div>
            </div>
            <div className='tooltip1' style={{width:this.props.w}}>{this.props.tooltiptext}</div>
         </div>;
    }
}
      
const mapStateToProps=(state)=>
{
    return{
        scrollToID: state.selection.scrollToID,
        outline:state.selection.outline
    };
};

export default connect(mapStateToProps)(Table);
//export default Table;