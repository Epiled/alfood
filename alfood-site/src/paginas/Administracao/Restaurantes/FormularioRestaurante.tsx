import { AppBar, Box, Button, Container, Link, Paper, TextField, Toolbar, Typography } from '@mui/material'
import { SyntheticEvent, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';

import { Link as RouterLink } from 'react-router-dom';
import { Method } from 'axios';

const FormularioRestaurante = () => {

  const paramentros = useParams();
  const [nomeRestaurante, setNomeRestaurante] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (paramentros.id) {
      http.get<IRestaurante>(`restaurantes/${paramentros.id}/`)
        .then(response => {
          setNomeRestaurante(response.data.nome)
        })
    }
  }, [paramentros])

  // const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   if (paramentros.id) {
  //     http.put(`restaurantes/${paramentros.id}/`, {
  //       nome: nomeRestaurante
  //     })
  //       .then(() => {
  //         alert('Restaurante atualizado com sucesso');
  //       })
  //   } else {
  //     http.post(`restaurantes/`, {
  //       nome: nomeRestaurante
  //     })
  //       .then(() => {
  //         alert('Restaurante cadastrado co sucesso');
  //       })
  //   }
  // }

  const aoSubmeterForm = (evento: SyntheticEvent) => {
    evento.preventDefault()
    let url = '/restaurantes/'
    let method: Method = 'POST'
    if (paramentros.id) {
      method = 'PUT'
      url += `${paramentros.id}/`
    }
    http.request({
      url,
      method,
      data: {
        nome: nomeRestaurante
      }
    }).then(() => {
      navigate('/admin/restaurantes')
    }).catch((erro) => {
      console.error('Erro ao processar a solicitação:', erro);
      // Adicione lógica para lidar com o erro, como exibir uma mensagem para o usuário.
    });
  }

  return (
    <>
      {/* conteudo da página */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
        <Typography component={'h1'} variant='h6'>Formulário de Restaurantes</Typography>
        <Box component={'form'} sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
          <TextField
            required
            value={nomeRestaurante}
            onChange={(event) => setNomeRestaurante(event.target.value)}
            margin='dense'
            id='nome'
            label='Nome do restaurante'
            type="text"
            fullWidth
            variant='standard'
          />
          <Button sx={{ marginTop: 1 }} type='submit' fullWidth variant='outlined'>Salvar</Button>
        </Box>
      </Box>
    </>
  )
}

export default FormularioRestaurante;