import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';
import { SignUpView } from '../sections/auth';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Sign up - ${CONFIG.appName}`}</title>
      </Helmet>

      <SignUpView />
    </>
  );
}
