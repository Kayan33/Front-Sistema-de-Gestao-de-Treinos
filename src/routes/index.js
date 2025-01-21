import React, { useContext } from 'react';

import Autenticado from './autenticado.routes';
import NAutenticado from './nAutenticado.routes';

export default function Rotas() {
    const isAutenticado = false; 
    return (
        isAutenticado ? <Autenticado /> : <NAutenticado />
    );
}
