import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '@mui/material';

import { Iconify } from '../../components/iconify';
import { registerUser } from '../../redux/Authentication/AuthRequests';

// ----------------------------------------------------------------------

const roles = ['Admin', 'Patient', 'Doctor'];

export function SignUpView() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { error } = useSelector((state) => state.auth);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const result = await dispatch(registerUser({ username, email, password, role }));

    if (result.meta.requestStatus === 'fulfilled') {
      setSuccess('User registered successfully');
      setTimeout(() => {
        navigate('/sign-in');
      }, 1500);
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
        error={Boolean(error)}
        helperText={error?.includes('username') ? error : ''}
      />

      <TextField
        fullWidth
        name="email"
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
        error={Boolean(error)}
        helperText={error?.includes('email') ? error : ''}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        error={Boolean(error)}
        helperText={error?.includes('password') ? error : ''}
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
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Sign in
          </Link>
        </Typography>
      </Box>

      {renderForm}
      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography align="center" sx={{ mt: 2, color: "green" }}>
          {success}
        </Typography>
      )}
    </>
  );
}