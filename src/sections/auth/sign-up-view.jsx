import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Toast notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Material-UI components
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Autocomplete } from '@mui/material';

// Custom components
import { Iconify } from '../../components/iconify';

// Redux actions
import { registerUser } from '../../redux/Authentication/AuthRequests';

// ----------------------------------------------------------------------

const roles = ['Admin', 'Patient', 'Doctor'];

export function SignUpView() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { error } = useSelector((state) => state.auth);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const result = await dispatch(registerUser({ username, email, password, role }));

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('User registered successfully', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setTimeout(() => {
        navigate('/sign-in');
      }, 2500);
    }
  };

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="username"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
        error={error && username === ''}
        helperText={error && username === '' ? 'This field is required' : ''}
      />

      <TextField
        fullWidth
        name="email"
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
        error={error && email === ''}
        helperText={error && email === '' ? 'This field is required' : ''}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        error={error && password === ''}
        helperText={error && password === '' ? 'This field is required' : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <Autocomplete
        disablePortal
        options={roles}
        name="role"
        value={role}
        onChange={(event, newValue) => setRole(newValue || '')}
        sx={{ width: '100%', mb: 3 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Role"
            error={error && role === ''}
            helperText={error && role === '' ? 'This field is required' : ''}
            required
          />
        )}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignUp}
      >
        Sign up
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign up</Typography>
        <Typography variant="body2" color="text.secondary">
          Have an account?
          <Link href="/sign-in" variant="subtitle2" sx={{ ml: 0.5 }}>
            Sign in
          </Link>
        </Typography>
      </Box>

      {renderForm}
      {error && (
        <Stack sx={{ width: '100%', padding: '1rem 0 0 0' }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
      <ToastContainer />
    </>
  );
}
