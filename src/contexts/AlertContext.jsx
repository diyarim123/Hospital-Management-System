import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    open: false,
    severity: 'info',
    message: '',
  });

  const showAlert = (severity, message) => {
    setAlertState({ open: true, severity, message });

    setTimeout(() => {
      setAlertState((prev) => ({ ...prev, open: false }));
    }, 3000);
  };

  // Memoize the value object
  const value = useMemo(() => ({ showAlert, alertState }), [alertState]);

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};