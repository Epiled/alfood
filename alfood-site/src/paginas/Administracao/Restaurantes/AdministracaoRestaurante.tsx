import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import IRestaurante from '../../../interfaces/IRestaurante';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../http';

const AdministracaoRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/')
      .then(response => {
        setRestaurantes(response.data)
      })
  }, [])

  const excluir = (restauranteAhSerExcluido: IRestaurante) => {
    http.delete(`restaurantes/${restauranteAhSerExcluido.id}/`)
    .then(() => {
      const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id);
      setRestaurantes([...listaRestaurantes]);
      alert('Restaurante excluido com suesso');
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
            <TableCell>
              {restaurante.nome}
            </TableCell>
            <TableCell>
              [<Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link>]
            </TableCell>
            <TableCell>
              <Button variant='outlined' color='error' onClick={() => excluir(restaurante)}>
                Excluir
              </Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes;