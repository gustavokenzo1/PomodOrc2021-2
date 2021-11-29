import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import './profile.css'
import bcrypt from 'bcryptjs'

function Profile () {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLogged, setIsLogged] = useState(false)
    const [edit, setEdit] = useState(false)
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')

    
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setIsLogged(true)
            handleProfile()
        } else {
            setIsLogged(false)
        }
    
        async function handleProfile() {
            const response = await api.get('/sessions')

            let i = 0
            for (i; i < response.data.length; i++) {
                if (localStorage.getItem('user') === response.data[i]._id) {
                    setUsername(response.data[i].username)
                    setEmail(response.data[i].email)
                    setPassword(response.data[i].password)
                }
            }
        }
    }, [isLogged])

    function handleEdit() {
        setEdit(!edit)
    }

    async function submitEdit() {
        
        if (!newUsername || !newPassword) {
            alert('Por favor, preencha todos os campos! Caso não deseje alterar, copie o cadastro anterior')
        } else {

            setNewPassword(bcrypt.hashSync(newPassword, '$2a$10$CwTycUXWue0Thq9StjUM0u'))
            console.log(newPassword)
            console.log(newUsername)
            const id = localStorage.getItem('user')
            await api.patch(`/sessions/${id}`, {
                password: newPassword,
                username: newUsername
            })
            setEdit(!edit)
            /* window.location.reload(); */
        }

    }

    return (
        <div className="principalLogin">
            <div className='profile-menu'>
                <h1 className='titleLogin'>Perfil</h1>
                {
                    edit ?
                    <form>

                    <div className='username'>
                        <div className='input-name'>Usuário: </div>
                        <input 
                        type='username'
                        id='username'
                        value={newUsername}
                        onChange={event => setNewUsername(event.target.value)}
                        autoComplete='off'
                        placeholder='Seu novo usuário'
                        />
                    </div>
                    <div className='password'>
                        <div className='input-name'>Senha: </div>
                        <input 
                        type='password'
                        id='password'
                        value={newPassword}
                        onChange={event => setNewPassword(event.target.value)}
                        autoComplete='off'
                        placeholder='Sua nova senha'
                        />
                    </div>
                    </form> 
                    :
                    <form>

                    <div className='username'>
                        <div className='input-name'>Usuário: </div>
                            { username }
                    </div>
                    <div className='email'>
                        <div className='input-name'>E-mail: </div>
                        { email }
                    </div>
                    <div className='password'>
                        <div className='passwordProfile'>Senha: </div>
                        <div className='observation'>
                            As senhas são criptografadas e não há como realizar o processo inverso. No entanto, você pode alterar essa senha.
                        </div>
                    </div>
                </form>
                }
                    {
                        edit ? 
                        <button className='edit-button' onClick={submitEdit}>Concluir</button> :
                        <button className='edit-button' onClick={handleEdit}>Editar</button>
                    }
            </div>
        </div>
    )
}

export default Profile