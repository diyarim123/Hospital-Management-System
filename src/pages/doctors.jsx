import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';

import { DoctorsView } from '../sections/doctors/view';
import DoctorModal from '../sections/doctors/doctors_modal';

// ----------------------------------------------------------------------

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title> {`Doctors - ${CONFIG.appName}`}</title>
      </Helmet>

      <DoctorsView handleModal={handleModal} />
      <DoctorModal isOpen={isOpen} handleModal={handleModal} />
    </>
  );
}
