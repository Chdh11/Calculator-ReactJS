import { Actions} from "./App"
import './styles.css'

export default function DigitButton({dispatch,digit}){
    return <button className='digit' 
    onClick={()=>dispatch({type:Actions.add_digit,payload:{digit}})}>
        {digit}
        </button>
}