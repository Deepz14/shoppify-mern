import React, {useReducer} from 'react';
import {Reducer} from './Reducer';

export const Productcontext = React.createContext();

export const ProductProvider = props => {

    const initialState = [];

    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Productcontext.Provider value={[state, dispatch]}>
            {props.children}
        </Productcontext.Provider>
    )
}