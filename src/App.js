
import './App.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./components/navbar.component";
class App extends Component {
  render() {
    return (
      <div> 
        <NavBar className = "nav" />
            </div> 
    );

  }
}

export default App; 

// const styles = {
//   width: '500px',
//   height: '500px',
// };

// function App() {
//   const div1 = React.useRef()
//   const div2 = React.useRef()
//   const div3 = React.useRef()

//   /**
//    * @param {HTMLElement} target 
//    */
//   function smoothScroll(target) {
//     const { top } = target.getBoundingClientRect()
//     window.scrollTo({
//       top: top + window.pageYOffset,
//       behavior: "smooth"
//     });
//   }

//   return (
//     <div>
//       <div ref={div1} style={{ background: 'yellowgreen', ...styles }}>
//         <p><button onClick={() => smoothScroll(div1.current)}>yellowgreen</button></p>
//         <p><button onClick={() => smoothScroll(div2.current)}>seagreen</button></p>
//         <p><button onClick={() => smoothScroll(div3.current)}>skyblue</button></p>
//       </div>

//       <div ref={div2} style={{ background: 'seagreen', ...styles }}>
//         {/* <p><button onClick={() => smoothScroll(div1.current)}>yellowgreen</button></p>
//         <p><button onClick={() => smoothScroll(div2.current)}>seagreen</button></p>
//         <p><button onClick={() => smoothScroll(div3.current)}>skyblue</button></p> */}
//       </div>

//       <div ref={div3} style={{ background: 'skyblue', ...styles }}>
//         {/* <p><button onClick={() => smoothScroll(div1.current)}>yellowgreen</button></p>
//         <p><button onClick={() => smoothScroll(div2.current)}>seagreen</button></p>
//         <p><button onClick={() => smoothScroll(div3.current)}>skyblue</button></p> */}
//       </div>
//     </div>
//   )
// }

// ReactDOM.render(<App />, document.getElementById('root'));