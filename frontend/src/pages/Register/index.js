import React, {useState} from 'react';
import './style.css';
import Logo from './../../img/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api'

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('') ;
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();
    async function handleRegister(e){
        e.preventDefault();
        const data ={name,email,whatsapp,city,uf};

        try{
            const response = await api.post('ongs', data);
            alert(`Seu Id de Acesso: ${response.data.id}`);
            history.push('/');
        }catch(err){
            alert(`Erro no caadastro tente novamente`);
        }

    };
    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={Logo} alt="Be the Hero"/>
                    <h1>Faça seu Login</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ong.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho Cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" placeholder="Nome da Ong" 
                        value ={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input 
                        type="email" placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                    <input 
                        type="text" placeholder="Whatsapp" 
                        value ={whatsapp}
                        onChange ={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                            type="text" placeholder="Cidade" 
                            value = {city}
                            onChange = {e => {setCity(e.target.value)}}
                        />
                        <input 
                            type="text" placeholder="UF" style= {{ width:80 }} 
                            value ={uf}
                            onChange = {e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}