import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi';
import './style.css';
import Logo from './../../img/logo.svg';
import api from '../../services/api'

export default function NewIncident(){
    
    const [title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e){
        
        e.preventDefault();
        const data ={title, description, value};

        try{
            await api.post('incidents',data,{
                headers:{
                    authorization:ongId,
                }
            });
            alert('Caso cadastrado com sucesso!');
            history.push('/profile');
        }catch(err){
            alert('Caso não cadastrado tente novamente');
        }
    }

    return (
        <div className="newProfile-container">
            <div className="content">
                <section>
                    <img src={Logo} alt="Be the Hero"/>
                    <h1>Cadasstre um novo casp</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Ir para Inicio
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        type="text" placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        type="email" placeholder="Descição" 
                        value={description}
                        onChange ={e => {setDescription(e.target.value)}}
                    />
                    <input 
                        type="text" placeholder="Valor em Reais" 
                        value ={value}
                        onChange ={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
