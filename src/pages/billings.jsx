import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';

import { BillingsView } from '../sections/billings/view';
import BillingModal from '../sections/billings/billings_modal';

// ----------------------------------------------------------------------

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title> {`Billings - ${CONFIG.appName}`}</title>
      </Helmet>

      <BillingsView handleModal={handleModal} />
      <BillingModal isOpen={isOpen} handleModal={handleModal} />
    </>
  );
}
