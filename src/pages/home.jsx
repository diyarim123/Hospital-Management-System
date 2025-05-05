import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';

import { OverviewAnalyticsView } from '../sections/overview/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="Hospital Management System"
        />
        <meta name="keywords" content="react,material-ui,application,dashboard,admin" />
      </Helmet>

      <OverviewAnalyticsView />
    </>
  );
}
