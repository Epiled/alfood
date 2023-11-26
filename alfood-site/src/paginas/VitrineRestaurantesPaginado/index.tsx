import React from 'react';
import Banner from '../../componentes/Banner';
import NavBar from '../../componentes/NavBar';
import Rodape from '../../componentes/Rodape';
import ListaRestaurantesPaginado from '../../componentes/ListaRestaurantesPaginado';

function Paginado() {
  return (
    <>
      <NavBar />
      <Banner />
      <ListaRestaurantesPaginado />
      <Rodape />
    </>
  );
}

export default Paginado;
