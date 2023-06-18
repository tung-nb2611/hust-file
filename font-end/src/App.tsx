import React from 'react';
import './App.css';
import { Box } from '@material-ui/core';
import ListFiles from 'page/ListFile';

const App: React.FC = () => {
  return (
    <Box>
        <ListFiles />
    </Box>
  );
}

export default App;
