import React from 'react';
import { DeleteEventFab } from './DeleteEventFab';
import { EditEventFab } from './EditEventFab';

export const SubMenu = () => {
  return (
    <div className='botonera-footer' ><DeleteEventFab /><EditEventFab /></div>
  )
}
