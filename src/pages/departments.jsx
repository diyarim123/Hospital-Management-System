import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';

import { DepartmentsView } from '../sections/departments/view';
import DepartmentModal from '../sections/departments/departments-modal';

// ----------------------------------------------------------------------

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title> {`Departments - ${CONFIG.appName}`}</title>
      </Helmet>

      <DepartmentsView handleModal={handleModal} />
      <DepartmentModal isOpen={isOpen} handleModal={handleModal} />
    </>
  );
}
