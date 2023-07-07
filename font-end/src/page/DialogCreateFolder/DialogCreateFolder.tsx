import { Box, TextField, WithStyles, withStyles } from "@material-ui/core";
import Dialog from "components/Dialog";
import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import styles from "./DialogCreateFolder.styles";
import FileServices from "services/FileServices";
import { FolderRequest } from "services/types";
import SnackbarUtils from "utilities/SnackbarUtilsConfigurator";
import { getMessageError } from "utilities/Error";
import { isNil } from "lodash";

export interface DialogCreateFolderProps {
  open: boolean;
  onClose: () => void;
  folderId?: number;
  initData: () => void;
}
const DialogCreateFolder = (
  props: DialogCreateFolderProps & WithStyles<typeof styles>
) => {
  const { open, onClose, classes, folderId, initData } = props;
  const history = useHistory();
  const [name, setName] = React.useState<string | undefined>();

  const handleCreateFolder = () => {
    if (isNil(name)) {
      SnackbarUtils.error("Tên folder không được để trống");
      return;
    }
    let request: FolderRequest = {
      name: name,
      folderId: folderId,
    };
    try {
      FileServices.addFolder(request);
      initData();
    } catch (error) {
      SnackbarUtils.error(getMessageError(error));
    }
    onClose();
    setName(undefined);
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={() => {
          setName(undefined);
          onClose();
        }}
        title={"Tạo mới thư mục"}
        onOk={() => {
          handleCreateFolder();
        }}
        textOk={"Lưu"}
        minWidthPaper="790px"
        DialogTitleProps={{
          dividerBottom: true,
        }}
        children={
          <Box padding={"16px"}>
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Tên thư mục"
              value={name}
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
          </Box>
        }
      />
    </Fragment>
  );
};
DialogCreateFolder.displayName = "DialogCreateFolder";
export default withStyles(styles)(DialogCreateFolder);
