import {ADD_FISCALIA, DEL_FISCALIA,EDIT_FISCALIA,GET_FISCALIAS } from './types';
import axios from 'axios';

export const getData = ()=> async dispatch =>{
    await axios.get('http://localhost:3001/fiscalia')
    .then(response=>{ 
        dispatch({
            type: GET_FISCALIAS,
            payload: response.data
        }) 
    })
}

export const delFiscalia = id=> async dispatch =>{
    await axios.delete('http://localhost:3001/fiscalia?Id='+id)
    .then(response=>{ 
        dispatch({
            type: DEL_FISCALIA,
            payload: response.data
        }) 
    })
}

export const updateFiscalia = (Id, Ubicacion, Telefono)=> async dispatch =>{
    await axios.put('http://localhost:3001/fiscalia',{Id,Ubicacion,Telefono})
    .then(response=>{ 
        dispatch({
            type: EDIT_FISCALIA,
            payload: response.data
        }) 
    })
}

export const addFiscalia = (Ubicacion, Telefono)=> async dispatch =>{
    await axios.post('http://localhost:3001/fiscalia',{Ubicacion,Telefono})
    .then(response=>{ 
        dispatch({
            type: ADD_FISCALIA,
            payload: response.data
        }) 
    })
}