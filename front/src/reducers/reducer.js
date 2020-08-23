import {ADD_FISCALIA, DEL_FISCALIA,EDIT_FISCALIA,GET_FISCALIAS } from '../actions/types';

const initialState = {
    fiscalias : []
}
export default function (state = initialState, action){ 
    switch(action.type){
        case ADD_FISCALIA:
            return {
                ...state,
                fiscalias : [...state.fiscalias,action.payload]
            }
        case DEL_FISCALIA:
            return {
                ...state,
                fiscalias : state.fiscalias.filter( fiscalia => 
                     fiscalia.id != action.payload.id 
                     )
            }
        case EDIT_FISCALIA:
            return {
                ...state,
                fiscalias : state.fiscalias.map( fiscalia =>
                     fiscalia.id === action.payload.id ? fiscalia = action.payload : fiscalia
                     )
            }
        case GET_FISCALIAS:
            return {
                ...state,
                fiscalias : action.payload
            }
        default:
            return state;
    }
        
}
