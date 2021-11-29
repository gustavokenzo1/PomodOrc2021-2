import React, { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import './Register.css'

import bcrypt from 'bcryptjs'

function Register () {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    let history = useNavigate()
    
    async function handleForm(e) {
        e.preventDefault()

        if (!username || !password || !email || !confirmPassword) {
            alert('Preencha todos os campos para se registrar!')
            
        } else {
            if (password === confirmPassword) {

                const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')

                await api.post('/sessions', {
                    username: username,
                    email: email,
                    password: hashedPassword
                })

            } else {
                alert('As senhas não são iguais!')
            }
        }

    }

    return (
        <div className="principal">
            <div className='register-menu'>
                <h1 className='title'>Registrar</h1>
                <form onSubmit={handleForm}>
                    <div className='user'>
                        <div className='input-name'>Usuário: </div>
                        <input 
                        type='text'
                        id='username'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        autoComplete='off'
                        placeholder='Seu usuário'
                        />
                    </div>
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
                    <div className='confirm-password'>
                        <div className='input-name'>Confirmar Senha: </div>
                        <input 
                        type='password' 
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                        autoComplete='off'
                        placeholder='Confirme sua senha'
                        />
                    </div>
                    <h1 className='alreadyRegistered'>Já está cadastrado? Clique <strong 
                    onClick={() => {
                        history('/login')
                    }}
                    >aqui</strong> para entrar </h1>

                    <button className='register-button' type='submit'
                    >Registrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register