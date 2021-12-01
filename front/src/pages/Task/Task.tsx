import React, {useState} from 'react' 
import api from '../../services/api';
import './Task.css';

export default function Form(props) {
  const { onSave } = props;

  const [text, setText]= useState("");



  return (
    <div className="principal">
        <div className='tasksMenu'>
            <h1>Tarefas</h1>
            <div className='submitInputs'>
                <input 
                  className="field" 
                  placeholder="Digite uma tarefa"
                  onChange={e => setText(e.currentTarget.value)} 
                />
                <div className='custom-select' style={{'width':'200px'}}>
                    <select>
                        <option value='0'>Selecione uma lista:</option>
                        <option value='1'>Não colocar em uma lista</option>
                    </select>
                </div>
            </div>

             <button 
             className="button-save"
             onClick={() => onSave(text)}>Salvar</button>
        </div>
    </div>

  );

}
