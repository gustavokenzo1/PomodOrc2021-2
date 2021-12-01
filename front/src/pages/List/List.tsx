import React, { useState, useEffect } from 'react' 
import api from '../../services/api';
import './List.css';
    
export default function Form() {

  const [edit, setEdit] = useState(false)
  const [text, setText] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const [list, setList] = useState([])

  function handleButton() {
    setEdit(!edit)    
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
        setIsLogged(true)
        handleTasklist()
    } else {
        setIsLogged(false)
    }

    const user_id = localStorage.getItem('user')

    async function handleTasklist() {
        const response = await api.get('/tasklists')

        console.log(response.data[0].list)

        /* 
        TODO
        1. Função que pega o id da lista ao clicar nela {
          - get da api as tasklists do user_id guardada no localStorage
          - fazer um loop por todas as listas do usuário, em que a posição da 
            lista no backend == posição da lista clicada
        }

        2. {
          - redirecionar até uma página para criar uma tarefa
          - pegar o que foi escrito nessa tarefa
          - enviar o que foi escrito como um elemento da [] da lista (append)
        }
        */
    }
}, [isLogged])

  return (
    <div className="principal">
        <div className='listsMenu'>
            <h1>Listas</h1>
            {
              edit ? 
              <div className='submitListInputs'>
                  <input 
                    className="field" 
                    placeholder="Digite um nome para a lista"
                    onChange={e => setText(e.currentTarget.value)}/>
              </div>
              :
              <div>
                <li>
                  blablabla
                </li>
              </div>
            }

            <button 
             className="button-save"
             onClick={handleButton}>{
               edit ? 'Salvar' : 'Criar Lista'
             }</button>
        </div>
    </div>

  );

}
