import React, { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import bcrypt from 'bcryptjs'

function Login () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successful, setSuccssesful] = useState(true)

    let history = useNavigate()
    
    async function handleForm(e) {
        e.preventDefault()
        
        const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')

        const response = await api.get('/sessions')

        if (!email || !password) {
            alert('Por favor, preencha todos os campos')

        } else {
            let i = 0;
            let check = 0;
            while( i < response.data.length && check === 0 ) { 
                if (email === response.data[i].email) {
                    if (hashedPassword === response.data[i].password) {
                        const { _id } = response.data[i]
                        localStorage.setItem('user', _id)
                        check++
                        history('/')
                    }else {
                        check--
                    }
                } else {
                    i++
                }
            }
    
            if ((check === 0 && i!==0) || check === -1){
                setSuccssesful(false)
            }
        }
    }

    return (
        <div className="principal">
            <div className='register-menu'>
                <h1 className='title'>Login</h1>
                <form onSubmit={handleForm}>
                    <div className='email'>
                        <div className='input-name'>E-mail: </div>
                        <input 
                        type='email'
                        id='email'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        autoComplete='off'
                        placeholder='Seu e-mail'
                        />
                    </div>
                    <div className='password'>
                        <div className='input-name'>Senha: </div>
                        <input 
                        type='password'
                        id='password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        autoComplete='off'
                        placeholder='Sua senha'
                        />
                    </div>
                    <h1 className='alreadyRegistered'>Ainda não possui cadastro? Clique <strong 
                    onClick={() => {
                        history('/register')
                    }}
                    >aqui</strong> para entrar </h1>

                    <button className='register-button' type='submit'>Entrar</button>
                </form>
                {
                    successful ? <div className='check'/> : <div className='check'>E-mail ou senha estão incorretos</div>
                }
            </div>
        </div>
    )
}

export default Login