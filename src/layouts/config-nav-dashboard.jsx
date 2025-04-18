import { Label } from '../components/label';
import { SvgColor } from '../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.png`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('dashboard'),
  },
  {
    title: 'Patients',
    path: '/patients',
    icon: icon('patient'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Doctors',
    path: '/doctors',
    icon: icon('doctor'),
  },
  {
    title: 'Appointments',
    path: '/appointments',
    icon: icon('appointment'),
  },
  {
    title: 'Medical Records',
    path: '/medical-records',
    icon: icon('medical_record')
  },
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: icon('log-in'),
  }
];
