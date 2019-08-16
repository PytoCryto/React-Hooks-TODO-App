import React from 'react';
import { Box } from '@material-ui/core';

export const AppLayout = ({ children }) => (
  <Box display="flex" flexDirection="column">
    <Box flexGrow={1}>{children}</Box>
  </Box>
);
