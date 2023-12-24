import React from 'react';
import { MDBFooter} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center'>
  

      <div className='text-center p-3 fixed-bottom' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', width: '100%' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href=''>
          Estas en la pagina de la empresa
        </a>
      </div>
    </MDBFooter>
  );
}
