import { Box } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import {
    ListFileProps
} from "./ListFile.types";
import styles from "./ListFile.styles";
import Button from "components/Button";
import BasicDownloadIcon from "components/SVG/BasicUploadIcon";
import  DialogUploadFile  from "./DialogUploadFile/DialogUploadFile";

const ListFiles = () => {
    const [openDialogUploadFile, setOpenDialogUploadFile] = useState(false);
    return (
        <Fragment>
            <Box>
                <Button variant="contained" color="primary" endIcon={<BasicDownloadIcon/>} onClick={() => {setOpenDialogUploadFile(true);}}>Upload file</Button>
            </Box>
            <DialogUploadFile 
                open={openDialogUploadFile}
                onClose={() => {
                    setOpenDialogUploadFile(false);
                } } />
        </Fragment>
    );
};

export default ListFiles;

