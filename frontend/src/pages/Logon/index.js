import React, {useState} from 'react';
import './style.css';
import {Link, useHistory} from 'react-router-dom';

import heroesImg from '../../img/heroes.png';
import logoImg from '../../img/logo.svg';
import {FiLogIn} from 'react-icons/fi'

import api from './../../services/api';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('sessions', {id});
            localStorage.setItem('ongId', id );
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        }catch(err){
            alert('Login não realizado tente novamente');
        }
    }
    return(
        <div className="logon-conteiner">
            <section className="form">
                <img src={logoImg} alt="Be the Hero "/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input 
                        placeholder="Sua ID" 
                        onChange={e =>{setId(e.target.value)}}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho Cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}