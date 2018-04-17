import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {ClearScrollToID} from '../actions/selection.js';
import Table from './Table.js';

class Tables extends React.Component
{
    MarginFirst1=0;

    MarginDefault=20;

    WMinTable=150;

    WAdd=100;  

    CountVisibleTables=4;

    CountLargeTables=2;

    WSmallTable =0; 
 
    constructor(props)
    {
        super(props);
        console.log('constructor');
        const w= document.body.clientWidth;
        this.state={scrollLeft :0, wWindow: w, wasScroll:false}; 
    }

    componentDidMount=()=>
    {
        const elem1 = ReactDOM.findDOMNode(this.refs.elementToFire1);
        elem1.addEventListener('scroll', this.fireOnScroll,true);
        window.addEventListener("resize", this.windowResized,true);
    }

    componentDidUpdate=()=>
    {
        if(this.props.scrollToID>-1)
        {
            let d=this.MarginFirst1-this.MarginDefault;
            console.log('componentDidUpdate dddd ='+d+ ', this.MarginFirst1='+this.MarginFirst1+
            ', this.props.scrollToID='+this.props.scrollToID);
           // this.props.changeScrollToID(-1);
           this.props.dispatch(ClearScrollToID());
            const elem = ReactDOM.findDOMNode(this.refs.elementToFire1);
            elem.scrollLeft=d;
        }
      
    }

    componentWillUnmount=()=>
    {
        const elem1 = ReactDOM.findDOMNode(this.refs.elementToFire1);
        elem1.removeEventListener('scroll', this.fireOnScroll);
        window.removeEventListener("resize", this.windowResized);
    }

    fireOnScroll =()=>
    {
        console.log('start fireOnScroll pos='+pos);
        const elem = ReactDOM.findDOMNode(this.refs.elementToFire1);
        let pos=0;
        if(elem!=null)
            pos = elem.scrollLeft;
        this.setState(()=>({scrollLeft:pos,wasScroll:true}));
        console.log('end fireOnScroll pos='+pos);
     }

     windowResized =()=>
     {
        const w= document.body.clientWidth;
        this.setState(()=>({wWindow:w}));
     }

    getW =()=>{return document.body.clientWidth;}

    getfSize=(h)=> { return (h-20-10)/100*15;}

    CorrectText=(name,w,fSize)=>
    {
        var el = document.createElement("span");
        let str=name;
        el.id='test';
        const padding=10;
        el.style.fontSize = fSize;
        el.style.padding = padding+'px';
        el.style.visibility = "hidden"; 
        document.body.appendChild(el);
        let ar=[];
        for(let i=0;i<2;i++)
        {
            for(;;)
            {
                el.innerHTML=str;
                const width=document.getElementById("test").offsetWidth;
                if(width<(w-padding*2))
                break;
                const num=str.lastIndexOf(' ');
                if(num<0)
                    break;
                if(i==1)
                    str=str.substr(0,num)+'...';
                else
                    str=str.substr(0,num);
            }
            if(str.length>0)
                ar.push(str);
            if(i==0)
              str=name.substr(str.length+1);
            
        }
        console.log('ar'+ar);
        document.body.removeChild(el);
        const result= ar[0]+((ar.length>1)?' '+ar[1]:'');
        if(result.length!=name.length)
            console.log(name+'   ===   '+result);
        return result;
    }
    
    getAllWidth=()=>{
      const count=this.props.tables.length;
      let AllWidth=0;
      const marginX=this.MarginDefault;
      for(let i=0;i<count; i++ )
      {
        AllWidth+=this.WSmallTable+marginX*2;
      }
      AllWidth+=this.CountLargeTables*this.WAdd;
      return AllWidth+marginX;
    }
    
    GetWSmallTable=(w)=>
    {
        w= document.body.clientWidth;
        const val= (w-this.MarginDefault*2*this.CountVisibleTables-this.CountLargeTables*this.WAdd)/this.CountVisibleTables;
        return val;
    }

    CalculateVisibleData = (wWindow)=>
    {
        let tabs=[];
        let endMarginBefore=0;
        this.CountVisibleTables=4;
        this.CountLargeTables=2;
        this.WSmallTable=this.GetWSmallTable(wWindow); 
        if(this.WSmallTable<this.WMinTable)
        {
            this.CountVisibleTables=3;
            this.CountLargeTables=1;
            this.WSmallTable=this.GetWSmallTable(wWindow);  
        }
        if(this.WSmallTable<this.WMinTable)
        {
            this.CountVisibleTables=2;
            this.CountLargeTables=0;
            this.WSmallTable=this.GetWSmallTable(wWindow); 
        }
        if(this.WSmallTable<this.WMinTable)
        {
            this.CountVisibleTables=1;
            this.CountLargeTables=0;
            this.WSmallTable=this.GetWSmallTable(wWindow); 
        }
        if(this.WSmallTable<this.WMinTable)
            this.WSmallTable=this.WMinTable;
    }

    findTablesToDraw=( tables,scrollToID)=>
    {
        const scrollLeft=this.state.scrollLeft;
        const wWindow=this.state.wWindow;
        this.CalculateVisibleData(scrollLeft,scrollToID,wWindow);
        const xMin=scrollLeft;
        const xMax=xMin+wWindow;
        let startIndex=0;
        let addIndex=0;
        let endMarginBefore=0;
        let startVisible=0;
        console.log('scrollToID1 '+scrollToID+ 'wasScroll='+this.state.wasScroll);
        for(let i=0;i<tables.length; i++ )
        {
            let table=tables[i];
            startVisible=endMarginBefore+this.MarginDefault;
            endMarginBefore += this.WSmallTable+this.MarginDefault*2;
            if(scrollToID>-1 ) //&& this.state.wasScroll==false)
            {
                if(tables[i].id==scrollToID )
                {
                    startIndex=i;
                    if(this.CountLargeTables==3 || this.CountLargeTables==4)
                    {
                        if(startIndex>0)
                            startIndex--;
                    }
                    console.log(' scrollToID='+scrollToID+',startIndex='+startIndex);
                        break;
                }
            }
            else
            {
                if(startVisible+this.WSmallTable<xMin)
                    continue;
                else if(startVisible<=xMax)
                {
                    addIndex=0;
                    startIndex=i;
                    if(xMin-startVisible>(startVisible+this.WSmallTable-xMin) )
                    {
                        addIndex=1;
                    }
                    break;
                }
            }
        }
        return this.getVisibleTables(tables,startIndex,addIndex,startVisible);      
    }

    getVisibleTables=(tables,startIndex,addIndex,startVisible)=>
    {
        console.log('startindex '+startIndex);
        let tabs=[];
        for(let j=0;j<this.CountVisibleTables+1;j++)
        {
            if(startIndex+j>=tables.length)
                break;
            const num=j-addIndex;
            let table=tables[startIndex+j];
    
            let wTable=this.WSmallTable;
            if(this.CountVisibleTables==4)
            {
                if(num==1 || num==2 ||(tables.length- startIndex)<4)
                    wTable=this.WSmallTable+this.WAdd;
            }
            if(this.CountVisibleTables==3)
            {
                if(num==1||(tables.length- startIndex)<3)
                    wTable=this.WSmallTable+this.WAdd;
            }
            
            if(tabs.length==0 )
            {
                this.MarginFirst1=startVisible;
            }
            const h=wTable/3*2;
            const fSize=this.getfSize(h);
            let name=table.name;
            const textNew=this.CorrectText(name,wTable,fSize);
            let tNew={w:wTable,h:h,fSize:fSize,text:textNew,id:table.id,participants:table.participants,name:name};
          
            tabs.push(tNew);
        }
        return tabs;
    }

    getStyle=()=>
    {
       let allW=this.getAllWidth();
       const w= this.props.wWindow;
       if(allW<w)
            allW=w;
       let h='100%';
        return {width:allW.toString()+'px',height:h};
    }
    
    render()
    {
        const tablesSelected=this.findTablesToDraw(this.props.tables, this.props.scrollToID);   
        const styleIn=this.getStyle();
        return  <div className="div--scroll" id='div--scroll' ref="elementToFire1">
                <div className='div--in' style={styleIn}>
                    {tablesSelected.length>0 && tablesSelected.map(
                        (table,index)=>{
                            const marginX=(index==0)?this.MarginFirst1:this.MarginDefault;
                                 return <Table id={index.toString()} key={index.toString()}
                                    w={table.w} h={table.h} text={table.text} participants={table.participants} id={table.id}
                                    marginX={marginX} marginXDefault={this.MarginDefault} fSize={table.fSize}
                                    tooltiptext={table.name+' , ID: '+table.id}
                                    />;
                            
                        } ) 
                    }
                </div>
            </div>
    }
}

const mapStateToProps=(state)=>
{
    return{
        tables:state.tables,
        scrollToID: state.selection.scrollToID,
        outline:state.selection.outline
    };
};

export default connect(mapStateToProps)(Tables);
//export default Tables