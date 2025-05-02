import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';

import { RecordsView } from '../sections/medical_records/view';
import RecordModal from '../sections/medical_records/records_modal';

// ----------------------------------------------------------------------

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title> {`Records - ${CONFIG.appName}`}</title>
      </Helmet>

      <RecordsView handleModal={handleModal} />
      <RecordModal isOpen={isOpen} handleModal={handleModal} />
    </>
  );
}
