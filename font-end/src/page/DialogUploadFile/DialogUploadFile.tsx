import { Box, FormControl, Typography, WithStyles, withStyles } from "@material-ui/core";
import Button from "components/Button";
import Dialog from "components/Dialog";
import React, { Fragment } from "react";
import styles from "./DialogUploadFile.styles";
import { useDropzone } from "react-dropzone";
import SnackbarUtils from "utilities/SnackbarUtilsConfigurator";
import FileServices from "services/FileServices";
import { getMessageError } from "utilities/Error";

export interface DialogUploadFileProps {
    open: boolean;
    onClose: () => void;
}
const DialogUploadFile = (props: DialogUploadFileProps & WithStyles<typeof styles>) => {
    const { open, onClose, classes } = props;
    const [fileImport, setFileImport] = React.useState<File[] | null>();
    const [description, setDescription] = React.useState<string | undefined>();
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (fileImport) {
                fileImport.push(acceptedFiles[0]);
            } else {
                setFileImport(acceptedFiles);
            }
        },
    });

    const handleUploadFile = () => {
        if (fileImport) {
            const data = new FormData();
            fileImport?.map((item) => {
                data.append("file", item);
            
            });
            // data.append("description", value)
            try {
                FileServices.uploadFile(data)
                  .then((res) => {
                    SnackbarUtils.success("Upload file thành công");
                    onClose();
                  })
                  .catch((e) => {
                    SnackbarUtils.error(getMessageError(e));
                  });
              } catch (error) {
                SnackbarUtils.error(getMessageError(error));
              }
        }

    }
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                title={"Upload new file"}
                onOk={() => { handleUploadFile(); }}
                textOk={"Lưu"}
                minWidthPaper="790px"
                DialogTitleProps={{
                    dividerBottom: true
                }}
                children={
                    <Box padding={"16px"}>
                        <Button>
                            <Box {...getRootProps({ className: classes.dragDropFile })}>
                                <Typography style={{ marginLeft: 10, color: "#0088FF" }}>
                                    Upload file
                                </Typography>
                            </Box>
                            <input {...getInputProps()} multiple={true} />
                        </Button>
                    </Box>
                }
            />
        </Fragment>
    );
};
DialogUploadFile.displayName = "DialogUploadFile";
export default withStyles(styles)(DialogUploadFile);