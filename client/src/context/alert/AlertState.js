import React, {useReducer} from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';
import {v1 as uuidv1} from 'uuid';



const AlertState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Set Alert

    const setAlert = (msg, type) =>{
        const id = uuidv1();
        dispatch({
            type: SET_ALERT,
            payload: {msg, type, id}
        });

        setTimeout(()=> dispatch({type: REMOVE_ALERT, payload: id}), 5000)
    }


    return (
        <AlertContext.Provider 
            value={{
                alerts: state,
                setAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
};

export default AlertState;