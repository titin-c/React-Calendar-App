import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}


export const CalendarModal = () => {

    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
    const [ titleValid, setTitleValid ] = useState(true);
    
    const [formValues, setFormValues] = useState( initEvent );

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if ( activeEvent ) {
            setFormValues( activeEvent );
        } else {
            setFormValues( initEvent );
        }
    }, [activeEvent, setFormValues])



    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        setFormValues( initEvent );
    }

    const handleStartDateChange = ( e ) => {
        setDateStart( e );
        setFormValues({
            ...formValues,
            start: e
        })
    }
    
    const handleEndDateChange = ( e ) => {
        setDateEnd( e );
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            return Swal.fire('Error','La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }

        if ( title.trim().length < 2 ) {
            return setTitleValid(false);
        }

        if ( activeEvent ) {
            dispatch( eventUpdated( formValues ) )
        } else {
            dispatch( eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'Fernando'
                }
            }) );
        }


        setTitleValid(true);
        closeModal();
        
    }


    return (
        <Modal
          isOpen={ modalOpen }
          onRequestClose={ closeModal }
          style={ customStyles }
          closeTimeoutMS={ 200 }
          className="modal modal-warning"
          overlayClassName="modal-fondo"
        >
      <div className="modal-header text-center">
        <h4 className="modal-title white-text w-100 font-weight-bold py-2"> { (activeEvent)? 'Editar evento': 'Nuevo evento' }</h4>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
          <span aria-hidden="true" className="white-text">&times;</span>
        </button>
      </div>
            <form 
                
                onSubmit={ handleSubmitForm }
            >

                <div className='form-flex'>
                    <div className="form-group">
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker
                            onChange={ handleStartDateChange }
                            value={ dateStart }
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker
                            onChange={ handleEndDateChange }
                            value={ dateEnd }
                            minDate={ dateStart }
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ !titleValid && 'is-invalid' } `}
                        placeholder="T??tulo del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted text-right">Una descripci??n corta...</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted  text-right">Informaci??n adicional...</small>
                </div>
                </form>
                <div className='modal-footer justify-content-between'>
                <button
                        type='button'
                        className="btn btn-outline-dark "
                        onClick={closeModal}
                    >
                        <i className="fas fa-times"></i>
                        <span> Cerrar</span>
                    </button>
                    <button
                        type="button"
                        className="btn btn-success "
                        onClick={handleSubmitForm}
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar Evento</span>
                    </button>
                    
                </div>
                
            
            
        </Modal>
    )
}
