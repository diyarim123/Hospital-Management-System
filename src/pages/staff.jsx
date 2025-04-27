import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';

import { StaffView } from '../sections/staff/view/staff_view';
import StaffModal from '../sections/staff/staff_modal';

// ----------------------------------------------------------------------

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title> {`Staff - ${CONFIG.appName}`}</title>
      </Helmet>

      <StaffView handleModal={handleModal} />
      <StaffModal isOpen={isOpen} handleModal={handleModal} />
    </>
  );
}
