import { useState } from 'react';
import { Helmet } from 'react-helmet-async';


import { CONFIG } from '../config-global';
import { PatientsView } from '../sections/patients/view';
import PatientModal from '../sections/patients/patients-modal';

// ----------------------------------------------------------------------

export default function Page() {

  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Helmet>
        <title> {`Patients - ${CONFIG.appName}`}</title>
      </Helmet>

      <PatientsView handleModal={handleModal} />
      <PatientModal isOpen={isOpen} handleModal={handleModal} />
    </>
  );
}
