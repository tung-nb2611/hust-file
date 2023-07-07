import { Box, FormControl, Typography, WithStyles, withStyles } from "@material-ui/core";
import Button from "components/Button";
import Dialog from "components/Dialog";
import React, { Fragment } from "react";
import styles from "./DialogUploadFile.styles";
import { useDropzone } from "react-dropzone";
import SnackbarUtils from "utilities/SnackbarUtilsConfigurator";
import FileServices from "services/FileServices";
import { getMessageError } from "utilities/Error";
import TextareaAutosize from "components/TextField/TextareaAutosize/TextareaAutosize";
import { formatNumber, formatSizeFileMB } from "utilities/Helpers";
import CloseSmallIcon from "components/SVG/CloseSmallIcon";
import { useHistory } from "react-router-dom";
import { toString } from "lodash";

export interface DialogUploadFileProps {
    open: boolean;
    onClose: () => void;
    folderId?: number;
    initData: () => void;
}
const DialogUploadFile = (props: DialogUploadFileProps & WithStyles<typeof styles>) => {
    const { open, onClose, classes, folderId, initData } = props;
    const history = useHistory();
    const [fileImport, setFileImport] = React.useState<File[] | null>();
    const [description, setDescription] = React.useState<string | undefined>();
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (fileImport) {
                if(acceptedFiles && acceptedFiles.length > 0){
                    acceptedFiles.map((item) => {
                        fileImport.push(item);
                    })
                }
            } else {
                setFileImport(acceptedFiles);
            }
        },
    });

    const handleUploadFile = () => {
        if (fileImport) {
            if(fileImport.length === 0){
                SnackbarUtils.error("File upload không được để trống!");
                return;
            }
            const data = new FormData();
            fileImport?.map((item) => {
                data.append("files", item);

            });
            data.append("description", description || "")
            data.append("folder_id", toString(folderId || 0))
            try {
                FileServices.uploadFiles(data)
                    .then((res) => {
                        SnackbarUtils.success("Upload file thành công");
                        onClose();
                        setFileImport(undefined);
                        setDescription(undefined);
                        initData();
                    })
                    .catch((e) => {
                        SnackbarUtils.error(getMessageError(e));
                    });
            } catch (error) {
                SnackbarUtils.error(getMessageError(error));
            }
        }

    }

    const removeFile = (file: File) => {
        if (fileImport) {
            let files = fileImport.filter((item) => item.name !== file.name);
            setFileImport(files);
        }
    };

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={() => {
                    setFileImport(undefined);
                    setDescription(undefined);
                    onClose();
                }}
                title={"Upload new file"}
                onOk={() => { handleUploadFile(); }}
                textOk={"Lưu"}
                minWidthPaper="790px"
                DialogTitleProps={{
                    dividerBottom: true
                }}
                children={
                    <Box padding={"16px"}>
                        <TextareaAutosize
                            label="Ghi chú"
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            value={description}
                        />
                        <Button>
                            <Box {...getRootProps({ className: classes.dragDropFile })}>
                                <Typography style={{ marginLeft: 10, color: "#0088FF" }}>
                                    Upload file
                                </Typography>
                            </Box>
                            <input {...getInputProps()} multiple={true} />
                        </Button>
                        {fileImport && fileImport.map((item) => (
                            <Box style={{ display: "flex" }}>
                                <Typography>{item.name} - {formatSizeFileMB(item?.size)}</Typography>
                                <CloseSmallIcon
                                    style={{width: 10, cursor: "pointer", marginLeft: 10}}
                                    onClick={() => {
                                        removeFile(item);
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                }
            />
        </Fragment>
    );
};
DialogUploadFile.displayName = "DialogUploadFile";
export default withStyles(styles)(DialogUploadFile);