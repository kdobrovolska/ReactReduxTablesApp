'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log('App is running 995');

var Counter = function (_React$Component) {
    _inherits(Counter, _React$Component);

    function Counter(props) {
        _classCallCheck(this, Counter);

        var _this = _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).call(this, props));

        _this.add = _this.add.bind(_this);
        _this.mines = _this.mines.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.state = { count: props.count };
        return _this;
    }

    _createClass(Counter, [{
        key: 'add',
        value: function add() {
            this.setState(function (prevState) {
                return { count: prevState.count + 1 };
            });
        }
    }, {
        key: 'mines',
        value: function mines() {
            this.setState(function (prevState) {
                return { count: prevState.count - 1 };
            });
        }
    }, {
        key: 'reset',
        value: function reset() {
            //this.setState(()=> {return {count: 0}});
            this.setState(function () {
                return { count: 0 };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            console.log('ren');
            return React.createElement(
                'div',
                null,
                ' ',
                React.createElement(
                    'h1',
                    null,
                    ' Counter:',
                    this.state.count
                ),
                React.createElement(
                    'button',
                    { onClick: this.add },
                    '+1'
                ),
                React.createElement(
                    'button',
                    { onClick: this.mines },
                    '-1'
                ),
                React.createElement(
                    'button',
                    { onClick: this.reset },
                    'reset'
                )
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log('DidMount');
            try {
                var val = localStorage.getItem('count');
                console.log(val);
                var vv = parseInt(val, 10);
                if (!isNaN(vv)) this.setState(function () {
                    return { count: vv };
                });
                console.log(vv);
            } catch (e) {
                console.log('err');
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.count != this.state.count) {
                localStorage.setItem('count', this.state.count);
                console.log('DidUodate');
            }
        }
    }]);

    return Counter;
}(React.Component);
//Counter.defaultProps={count:9};


ReactDOM.render(React.createElement(Counter, { count: 0 }), document.getElementById('app'));

/*let count=0;
let someId='my_id1';
const add=()=>{ 
    count++;
    funRender3();
};
const minesOne=()=>{
   count--;
   funRender3();
}
const reset=()=>{
    count=0;
    funRender3();
 }
const funRender3=()=>
{
    const template1=(
        <div> 
        <h1> Count: {count}</h1>
        <button id={someId} className ='c1' onClick={add}>+1 </button>
        <button  onClick={minesOne}>-1 </button>
        <button onClick={reset }>reset </button>
        </div>);
        //  console.log(template1);
    
    
    var appRoot =document.getElementById('app');
    ReactDOM.render(template1,appRoot);
    

};
funRender3();*/
