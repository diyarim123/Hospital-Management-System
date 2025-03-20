import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';

import { DoctorsView } from '../sections/doctors/view/doctors_view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Doctors - ${CONFIG.appName}`}</title>
      </Helmet>

      <DoctorsView />
    </>
  );
}
