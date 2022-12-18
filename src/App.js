import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import * as action from "./actions/index";
import ResultScreen from "./component/ResultScreen";
import Keypad from "./component/Keypad";

function App() {
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  const [result, setResult] = useState('')

  function onClick(button) {
    switch(button){
      case '=':
        return calculate();
      case 'C':
        return  reset(); 
      case 'CE':
        return backspace();
      default:
        return setResult(result + button)
    }
  }

  function calculate() {
    var checkResult = ''
    if (result.includes('--')){
      checkResult = result.replace('--','+');
    } 
    else {
      checkResult = result
    }

    try {
      setResult(`${eval(checkResult) || ''}`);
    } 
    catch (error) {
      setResult('error');
      console.error('Could not calcuate results because of error: ', error);
    }
  }

  function reset() {
    setResult('');
  }

  function backspace() {
    setResult(result.slice(0, -1));
  }


  return (
    <div className="App">
      <div className="calculator-body">
        <h1>Online Calculator</h1>
        <ResultScreen result={result}/>
        <Keypad onClick={onClick}/>
      </div>
      
      <br />

      {isLogged ? (
        <div>
          <h3>Hidden Mickey</h3>
          <button onClick={() => dispatch(action.logout())}>Logout</button>
        </div>
      ) : (
        <button onClick={() => dispatch(action.login())}>Log In</button>
      )}
    </div>
  );
}

export default App;
