import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import IPrato from '../../../interfaces/IPrato';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../http';

const AdministracaoPratos = () => {

  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>('pratos/')
      .then(response => {
        setPratos(response.data)
      })
  }, [])

  const excluir = (pratoAhSerExcluido: IPrato) => {
    http.delete(`pratos/${pratoAhSerExcluido.id}/`)
    .then(() => {
      const listaPratos = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id);
      setPratos([...listaPratos]);
      alert('Prato excluido com suesso');
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
              Tag
            </TableCell>
            <TableCell>
              Imagem
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
          {pratos.map(prato => <TableRow key={prato.id}>
            <TableCell>
              {prato.nome}
            </TableCell>
            <TableCell>
              {prato.tag}
            </TableCell>
            <TableCell>
              [<a href={prato.imagem} target='_blank' rel='noreferrer'>ver imagem</a>]
            </TableCell>
            <TableCell>
              [<Link to={`/admin/pratos/${prato.id}`}>editar</Link>]
            </TableCell>
            <TableCell>
              <Button variant='outlined' color='error' onClick={() => excluir(prato)}>
                Excluir
              </Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoPratos;