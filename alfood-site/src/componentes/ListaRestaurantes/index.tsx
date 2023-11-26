import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { Button, TextField } from '@mui/material';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximoPagina, setProximoPagina] = useState('');
  const [busca, setBusca] = useState('');

  useEffect(() => {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(response => {
        setRestaurantes(response.data.results);
        setProximoPagina(response.data.next);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximoPagina)
      .then(response => {
        setRestaurantes([...restaurantes, ...response.data.results]);
        setProximoPagina(response.data.next);
      })
  }

  useEffect(() => {
    axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/', {
      params: {
        ordering: 'nome',
        search: `${busca}`
      }
    })
      .then(response => {
        setRestaurantes(response.data)
      })
  }, [busca])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>

    <form>
      <TextField
        value={busca}
        onChange={(event) => setBusca(event.target.value)}
        label='Nome do restaurante'
        variant='standard' />
    </form>

    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximoPagina && <button onClick={verMais}>
      ver mais
    </button>}
  </section>)
}

export default ListaRestaurantes