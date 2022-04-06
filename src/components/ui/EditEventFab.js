import React from 'react';
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui';

export const EditEventFab = () => {

    const dispatch = useDispatch();

    const handleEdit = (e) => {
        dispatch( uiOpenModal() );
    }

    return (
        <button
            className="btn btn-light fab-danger"
            onClick={ handleEdit }
        >
            <i className="fas fa-edit"></i>
            <span> Editar evento</span>
        </button>
    )
}
