import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';

import { ServicesView } from '../sections/services/view';
import ServiceModal from '../sections/services/services-modal';

// ----------------------------------------------------------------------

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title> {`Services - ${CONFIG.appName}`}</title>
      </Helmet>

      <ServicesView handleModal={handleModal} />
      <ServiceModal isOpen={isOpen} handleModal={handleModal} />
    </>
  );
}
