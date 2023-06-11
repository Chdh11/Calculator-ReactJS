import {useReducer} from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import './App.css';
import './styles.css';

export const Actions={
  add_digit:'add-digit',
  choose_operation:'choose-operation',
  clear:'clear',
  delete_digit:'delete-digit',
  evaluate:'evaluate'
}

function reducer(state,{type,payload}){
  switch(type)
  {
    case Actions.add_digit:
      if(payload.digit==='0' && state.currentOperand==='0' || state.currentOperand==='00') 
      {
        return state
      }
      if(payload.digit==='00' && state.currentOperand==='0' || state.currentOperand==='00') 
      {
        return state
      }
      if(payload.digit==='.' && state.currentOperand.includes(".")) 
      {
        return state
      }
      if(state.overwrite)
      {
        return{
          ...state,
          currentOperand:payload.digit,
          overwrite:false
        }
      }
      return{
        ...state, 
        currentOperand:`${state.currentOperand|| ""}${payload.digit}`,
      }

    case Actions.choose_operation:
      if(state.currentOperand == null && state.previousOperand == null) 
      {
        return state
      }
      if(state.previousOperand==null)
      {
        return{
          ...state, 
          operation:payload.operation,
          previousOperand:state.currentOperand,
          currentOperand:null
        }
      }
      if(state.currentOperand == null && state.previousOperand != null)
      {
        return{
          ...state,
          operation:payload.operation,
        }
      }
      return{
        ...state,
        previousOperand : eva(state),
        operation : payload.operation,
        currentOperand : null
      }

    case Actions.clear:
      return{}
    
    case Actions.delete_digit:
      if(state.overwrite) 
      {
        return{
          ...state,
          overwrite:false,
          currentOperand:null
        }
      }
      if(state.currentOperand == null) 
      {
        return state
      }
      if(state.currentOperand.length===1) 
      {
        return {...state,currentOperand:null}
      }
      return{
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }

    case Actions.evaluate:
      if(state.currentOperand==null || state.previousOperand == null || state.operation==null)
      {
        return state
      }
      return{
        ...state,
        overwrite:true,
        previousOperand:null,
        operation:null,
        currentOperand:eva(state),
      }
  }
}
function eva({currentOperand,previousOperand,operation})
{
  const prev=parseFloat(previousOperand)
  const curr=parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(curr)) return ""
  let compute=""
  switch(operation){
    case '+':
      compute=prev+curr
      break
    case '-':
      compute=prev-curr
      break
    case '×':
      compute=prev*curr
      break
    case '÷':
      compute=prev/curr
      break
    case '%':
      compute=prev%curr
      break
  }
  return compute.toString()
}
const integer_formatter=new Intl.NumberFormat("en-in",{
  maximumFractionDigits:0,
})
function formatOperand(operand){
  if(operand==null) return 
  const [integer,decimal]=operand.split('.')
  if(decimal==null) return integer_formatter.format(integer)
  return `${integer_formatter.format(integer)}.${decimal}`
}

function App() {
  const[{currentOperand,previousOperand, operation},dispatch]=useReducer(reducer,{})
  return (
    <div className="App">
      <div className='heading'>
        Simple Calculator <span>&lt;Created using ReactJS&gt;</span>
      </div>
      <div className='grid-container'>
        <div className='output'>
          <div className='previous-input'>{formatOperand(previousOperand)} {operation}</div>
          <div className='current-input'>{formatOperand(currentOperand)}</div>
        </div>

        <button className='clear' onClick={()=>dispatch({type:Actions.clear})}>C</button>
        <OperationButton operation="%" dispatch={dispatch}/>
        <button className='delete' onClick={()=>dispatch({type:Actions.delete_digit})}>DEL</button>
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton  digit="7" dispatch={dispatch} />
        <DigitButton  digit="8" dispatch={dispatch} />
        <DigitButton  digit="9" dispatch={dispatch} />
        <OperationButton operation="×" dispatch={dispatch} />
        <DigitButton  digit="4" dispatch={dispatch} />
        <DigitButton  digit="5" dispatch={dispatch} />
        <DigitButton  digit="6" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="00" dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <button className='evaluate' onClick={()=>dispatch({type:Actions.evaluate})}>=</button>
      </div>
      <div className='ending'>
        Created By Chhavi Dhankhar
      </div>
    </div>
  );
}

export default App;
