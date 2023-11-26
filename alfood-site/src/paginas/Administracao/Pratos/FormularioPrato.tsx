import { AppBar, Box, Button, Container, FormControl, InputLabel, Link, MenuItem, Paper, Select, TextField, Toolbar, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../http';
import ITag from '../../../interfaces/ITag';
import IRestaurante from '../../../interfaces/IRestaurante';
import IPrato from '../../../interfaces/IPrato';

const FormularioPrato = () => {

  const parametros = useParams()

  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(response => { setTags(response.data.tags) })
    http.get<IRestaurante[]>('restaurantes/')
      .then(response => { setRestaurantes(response.data) })
  }, [])

  const [nomePrato, setNomePrato] = useState('');
  const [descricaoPrato, setDescricaoPrato] = useState('');
  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const [tag, setTag] = useState('');
  const [restaurante, setRestaurante] = useState('');

  const [imagem, setImagem] = useState<File | null>(null);

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    } else {
      setImagem(null)
    }
  }

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('nome', nomePrato)
    formData.append('descricao', descricaoPrato)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)

    if (imagem) {
      formData.append('imagem', imagem)
    }

    if (parametros.id) {
      http.put(`pratos/${parametros.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      http.request({
        url: 'pratos/',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then(() => {
          setNomePrato('')
          setDescricaoPrato('')
          setTag('')
          setRestaurante('')
          alert('Prato cadastrado com sucesso!')
        })
        .catch(erro => console.error('Erro durante a operação:', erro));
    }
  }

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(response => {
          setNomePrato(response.data.nome)
          setDescricaoPrato(response.data.descricao)
          setTag(response.data.tag)
          setRestaurante(String(response.data.restaurante));
        })
    }
  }, [parametros.id])



  return (
    <>
      {/* conteudo da página */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
        <Typography component={'h1'} variant='h6'>Formulário de Pratos</Typography>
        <Box component={'form'} sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
          <TextField
            value={nomePrato}
            onChange={(event) => setNomePrato(event.target.value)}
            label='Nome do prato'
            variant='standard'
            fullWidth
            required
            margin="dense"
          />

          <TextField
            value={descricaoPrato}
            onChange={(event) => setDescricaoPrato(event.target.value)}
            label='Descrição do prato'
            variant='standard'
            fullWidth
            required
            margin="dense"
          />

          <FormControl margin='dense' fullWidth>
            <InputLabel id="select-tag">Tag</InputLabel>
            <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
              {tags.map((tag => <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl margin='dense' fullWidth>
            <InputLabel id="select-restaurante">Restaurante</InputLabel>
            <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
              {restaurantes.map((item => <MenuItem key={item.id} value={item.id}>
                {item.nome}
              </MenuItem>
              ))}
            </Select>
          </FormControl>

          <input type="file" name="imagem" id="imagem" onChange={selecionarArquivo} />

          <Button sx={{ marginTop: 1 }} type='submit' fullWidth variant='outlined'>Salvar</Button>
        </Box>
      </Box>
    </>
  )
}

export default FormularioPrato;