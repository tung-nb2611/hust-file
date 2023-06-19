import { Box, Table, TableBody, TableCell, TableHead } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import {
    ListFileProps
} from "./ListFile.types";
import styles from "./ListFile.styles";
import Button from "components/Button";
import BasicDownloadIcon from "components/SVG/BasicUploadIcon";
import DialogUploadFile from "./DialogUploadFile/DialogUploadFile";
import Pagintation from "components/Paging/Pagintation";

const ListFiles = () => {
    const [openDialogUploadFile, setOpenDialogUploadFile] = useState(false);
    return (
        <Fragment>
            <Box style={{ margin: "auto", width: "90%" }}>
                <Box style={{ width: "100%", height: 60 }}>
                    <Button variant="contained" color="primary" style={{ marginTop: "10px" }} endIcon={<BasicDownloadIcon />} onClick={() => { setOpenDialogUploadFile(true); }}>Upload file</Button>
                </Box>
                <Box style={{ border: "1px solid #D3D5D7", borderRadius: 3, marginTop: 16 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên file</TableCell>
                            <TableCell>Ghi chú</TableCell>
                            <TableCell>Loại file</TableCell>
                            <TableCell>Ngày tạo</TableCell>
                            <TableCell>Ngày cập nhật</TableCell>
                            <TableCell></TableCell>
                        </TableHead>
                        <TableBody>
                            <TableCell>1</TableCell>
                            <TableCell>Tên file</TableCell>
                            <TableCell>Ghi chú</TableCell>
                            <TableCell>Loại file</TableCell>
                            <TableCell>Ngày tạo</TableCell>
                            <TableCell>Ngày cập nhật</TableCell>
                            <TableCell>Tải xuống</TableCell>
                        </TableBody>
                    </Table>
                    <Box>
                        <Pagintation
                            pageSize={20}
                            total={100}
                            page={1}
                            pageChange={() => { }}
                            pageSizeChange={() => { }}
                        />
                    </Box>
                </Box>
            </Box>
            <DialogUploadFile
                open={openDialogUploadFile}
                onClose={() => {
                    setOpenDialogUploadFile(false);
                }} />
        </Fragment>
    );
};

export default ListFiles;

