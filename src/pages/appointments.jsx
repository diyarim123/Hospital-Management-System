import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';

import { AppointmentsView } from '../sections/appointments/view';
import AppointmentModal from '../sections/appointments/appointments_modal';

// ----------------------------------------------------------------------

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title> {`Appointments - ${CONFIG.appName}`}</title>
      </Helmet>

      <AppointmentsView handleModal={handleModal} />
      <AppointmentModal isOpen={isOpen} handleModal={handleModal} />
    </>
  );
}
