import React, { useMemo } from 'react';
import './App.css';
import { Box, WithStyles } from '@material-ui/core';
import { } from "@material-ui/core";
import ListFiles from 'page/ListFile';
import { ConnectedProps, connect } from 'react-redux';
import { updateTheme } from "store/Theme/themeSlice";
import { ThemeProvider, withStyles } from "@material-ui/styles";
import { createTheme } from "theme";
import { AppState } from 'store/store';
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "utilities/SnackbarUtilsConfigurator";
import { ModalProvider } from 'components/Modal/ModalProvider';
const styles = {
  base: {
    "& span": {
      fontSize: 14,
    },
  },
  processBarBaseLine: {
    backgroundColor: "unset",
  },
  processBarRoot: {
    height: 3,
  },
};
const App = (props: PropsFromRedux & WithStyles<typeof styles>) => {
  const { classes} = props;
  const theme = useMemo(() => createTheme(props.theme.currentTheme), [props.theme.currentTheme]);
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={1}
          hideIconVariant={true}
          classes={{
            variantSuccess: "snackSuccess",
            variantError: "snackError",
            variantWarning: "snackWarning",
            variantInfo: "snackInfo",
            root: classes.base,
          }}
        >
          <SnackbarUtilsConfigurator />
            <ModalProvider>
                <ListFiles />
            </ModalProvider>
        </SnackbarProvider>
      </ThemeProvider>

    </Box>
  );
}
const mapStateToProps = (state: AppState) => ({
  theme: state.theme,
});

const mapDispatchToProps = {
  updateTheme,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withStyles(styles)(App));
