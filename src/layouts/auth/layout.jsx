import PropTypes from 'prop-types';
import { stylesMode } from '../../theme/styles';

import { Logo } from '../../components/logo';

import { Main } from './main';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
// ----------------------------------------------------------------------


export function AuthLayout({ sx, children, header }) {
  const layoutQuery = 'md';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: { maxWidth: false },
            toolbar: { sx: { bgcolor: 'transparent', backdropFilter: 'unset' } },
          }}
          sx={{
            position: { [layoutQuery]: 'fixed' },

            ...header?.sx,
          }}
          slots={{
            leftArea: <Logo />
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{ '--layout-auth-content-width': '420px' }}
      sx={{
        '&::before': {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          opacity: 0.24,
          position: 'fixed',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: `url(/assets/background/overlay.jpg)`,
          [stylesMode.dark]: { opacity: 0.08 },
        },
        ...sx,
      }}
    >
      <Main layoutQuery={layoutQuery}>{children}</Main>
    </LayoutSection>
  );
}

AuthLayout.propTypes = {
  sx: PropTypes.objectOf(Object),
  children: PropTypes.node.isRequired,
  header: PropTypes.string
}