import { Actions} from "./App"
import './styles.css'

export default function OperationButton({dispatch,operation}){
    return <button className='operation' 
    onClick={()=>dispatch({type:Actions.choose_operation,payload:{operation}})}>
        {operation}
        </button>
}