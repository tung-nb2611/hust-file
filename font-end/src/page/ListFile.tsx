import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Typography,
} from "@material-ui/core";
import Button from "components/Button";
import Pagintation from "components/Paging/Pagintation";
import { DEFAULT_PAGESIZE_OPTIONS } from "components/Paging/SapoGrid.constants";
import BasicDownloadIcon from "components/SVG/BasicUploadIcon";
import { DataResult } from "components/SapoGrid/SapoGrid.type";
import React, { Fragment, useEffect, useState } from "react";
import FileServices from "services/FileServices";
import { FileFilterRequest, FileResponse } from "services/types";
import {
  formatDateUTCToLocalDateString,
  formatSizeFileMB,
} from "utilities/Helpers";
import DialogUploadFile from "./DialogUploadFile/DialogUploadFile";
import Link from "components/Link/Link";
import saveAs from "file-saver";
import axios from "axios";
import SnackbarUtils from "utilities/SnackbarUtilsConfigurator";
import CloudDownloadIcon from "components/SVG/CloudDownloadIcon";
import SearchBox from "components/SearchBox/SearchBox";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CloseSmallIcon from "components/SVG/CloseSmallIcon";
import useModal from "components/Modal/useModal";
import ConfirmDialog from "components/Dialog/ConfirmDialog/ConfirmDialog";
import { BackIcon, LongArrowDownIcon, PencilIcon, PlusIcon } from "components/SVG";
import Dialog from "components/Dialog/Dialog";
import TextareaAutosize from "components/TextField/TextareaAutosize/TextareaAutosize";
import Image from "components/Image";
import { Replay } from "@material-ui/icons";
import { REACT_APP_API_BASE_URL } from "services/config";
import DialogCreateFolder from "./DialogCreateFolder/DialogCreateFolder";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchbox: {
      flex: 1,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "0 32px 40px",
      flex: "1 1 auto",
      "& .MuiChip-root": {
        padding: "4px 4px",
        fontSize: "14px",
        height: "24px",
      },
      "& .MuiTableContainer-root.stickyHeader": {
        backgroundColor: "#F3F4F5",
      },
      "& .MuiTableHead-root": {
        backgroundColor: "#F3F4F5",
        "& .MuiTableCell-paddingNone": {
          padding: "0 16px",
        },
        "& .MuiTableCell-root": {
          paddingTop: "12px",
          paddingBottom: "12px",
        },
      },
    },
  })
);
const ListFiles = () => {
  const classes = useStyles();
  const [openDialogUploadFile, setOpenDialogUploadFile] = useState(false);
  const [openDialogCreateFolder, setOpenDialogCreateFolder] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openDialogImage, setOpenDialogImage] = useState(false);
  const [pathImage, setPathImage] = useState("");
  const [request, setRequest] = useState<{
    id?: number;
    description?: string;
  }>();
  const [filter, setFilter] = useState<FileFilterRequest>({
    limit: 20,
    statuses: "1",
  });
  const [folder, setFolder] = useState<FileResponse>();
  const [folders, setFolders] = useState<{ id: number; name: string }[]>([]);
  const [data, setData] = useState<DataResult>({
    data: [],
    total: 0,
  });
  const { openModal } = useModal();
  useEffect(() => {
    initData();
  }, [filter]);
  const initData = async () => {
    try {
      let res = await FileServices.filter(filter);
      if (res.data) {
        setData({
          data:
            res.data.data?.map((item, index) => {
              return {
                ...item,
                stt: index + 1,
              };
            }) || [],
          total: res.data.metadata?.total || 0,
        });
      }
    } catch (error) {}
  };

  const downloadFile = async (id?: number, fileName?: string) => {
    axios
      .get(`${REACT_APP_API_BASE_URL}/api/file/download/${id}`, {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data]);
        //Download file
        saveAs(blob, fileName);
      })
      .catch((error) => {
        // Xử lý lỗi ở đây
        SnackbarUtils.error("Có lỗi xảy ra!");
      });
  };

  const deleted = async (id?: number, isFolder?: boolean) => {
    openModal(ConfirmDialog, {
      message: isFolder ? "Bạn có chắc chắn muốn xóa thư mục này không?" : "Bạn có chắc chắn muốn xóa file này không?",
      title: isFolder ? "Xóa thư mục" : "Xóa file",
      cancelButtonText: "Thoát",
      deleteButtonText: "Xóa",
      isDelete: true,
    }).result.then(async (res) => {
      if (res) {
        try {
          let resD = await FileServices.delete(id);
          if (resD) {
            SnackbarUtils.success("Xóa file thành công!");
            initData();
          }
        } catch (error) {
          SnackbarUtils.error("Xóa file thất bại!");
        }
      }
    });
  };

  const updateFile = async () => {
    setOpenDialogUpdate(false);
    try {
      let resD = await FileServices.updateFile(request?.id, {
        description: request?.description,
      });
      if (resD) {
        SnackbarUtils.success("Cập nhật mô tả thành công!");
        initData();
      }
    } catch (error) {
      SnackbarUtils.error("Cập nhật mô tả thất bại!");
    }
  };
  const handleSearch = (value: any) => {
    if (!value || !value?.trim()) {
    }
    setFilter((prev) => ({ ...prev, query: value?.trim() }));
  };

  return (
    <Fragment>
      <Box className={classes.container}>
        <Box style={{ margin: "auto", width: "90%", height: "100%" }}>
          <Box style={{ width: "100%", height: 60 }}>
            <IconButton style={{ marginTop: 20}} onClick={() => {
                setFilter({ ...filter, folderId: undefined });
                folders.pop();
            }}>
                <BackIcon/>
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
              endIcon={<BasicDownloadIcon />}
              onClick={() => {
                setOpenDialogUploadFile(true);
              }}
            >
              Upload file
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px", marginLeft: 10 }}
              startIcon={<PlusIcon />}
              onClick={() => {
                setOpenDialogCreateFolder(true);
              }}
            >
              Tạo folder
            </Button>
            <IconButton
              onClick={() => {
                initData();
                SnackbarUtils.success("Tải lại trang thành công!");
                return;
              }}
            >
              <Replay />
            </IconButton>
          </Box>
          <Box>
            <Typography style={{ color: "#3f51b5" }}>
              <Link
                to="#"
                onClick={() => {
                  setFilter({ ...filter, folderId: undefined });
                  setFolders([])
                }}
              >
                ..
              </Link>
              /
              {folders.map((item) => {
                return (
                  <span key={item.id}>
                    <Link
                      to="#"
                      onClick={() => {
                        setFilter({ ...filter, folderId: item.id });
                        if(item.id !== folder?.id){
                            let index = folders.findIndex((fol) => fol.id === item?.id);
                            setFolders(folders.slice(0, index + 1));
                        }
                        setFolder(item);
                      }}
                    >
                      {item.name}
                    </Link>
                    /
                  </span>
                );
              })}
            </Typography>
          </Box>
          <Box
            style={{
              border: "1px solid #D3D5D7",
              borderRadius: 3,
              marginTop: 16,
            }}
          >
            <SearchBox
              placeholder={"Tìm kiếm tên, mô tả file ..."}
              onSubmit={(e, value) => {
                handleSearch(value);
              }}
              value={null}
              onBlur={(value: any) => {
                if (value !== filter.query) handleSearch(value);
              }}
              className={classes.searchbox}
            />
            <Table stickyHeader>
              <TableHead>
                <TableCell>STT</TableCell>
                <TableCell></TableCell>
                <TableCell>Tên file</TableCell>
                <TableCell>Ghi chú</TableCell>
                <TableCell>Loại file</TableCell>
                <TableCell>Kích thước</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Ngày cập nhật</TableCell>
                <TableCell></TableCell>
              </TableHead>
              {data.data && data.data.length > 0 ? (
                data.data.map((file, index) => (
                  <TableBody key={index}>
                    <TableCell>{file.stt}</TableCell>
                    <TableCell>
                      {file.fileType.includes("image") ? (
                        <Box
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (file.fileType !== "folder") {
                              setPathImage(
                                `${REACT_APP_API_BASE_URL}/api/file/view/${file.id}`
                              );
                              setOpenDialogImage(true);
                            }
                          }}
                        >
                          <Image
                            src={`${REACT_APP_API_BASE_URL}/api/file/view/${file.id}`}
                            width="50px"
                            height="50px"
                          />
                        </Box>
                      ) : (
                        <Box
                          style={{
                            width: "50px",
                            height: "50px",
                            background: "#E8EAEB",
                            borderRadius: "6px",
                          }}
                        ></Box>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        to="#"
                        onClick={() => {
                          if (file.fileType !== "folder") {
                            downloadFile(file.id, file.fileName);
                          } else {
                            setFolder(file);
                            setFilter({
                              ...filter,
                              folderId: file.id,
                            });
                            folders.push({
                              id: file.id,
                              name: file.fileName,
                            });
                          }
                        }}
                      >
                        {file.fileName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {file.description}
                      <PencilIcon
                        style={{ marginLeft: 10, width: 15, cursor: "pointer" }}
                        color="disabled"
                        onClick={() => {
                          setOpenDialogUpdate(true);
                          setRequest({
                            id: file.id,
                            description: file.description,
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>{file.fileType}</TableCell>
                    <TableCell>{formatSizeFileMB(file.size)}</TableCell>
                    <TableCell>
                      {formatDateUTCToLocalDateString(file.createdOn)}
                    </TableCell>
                    <TableCell>
                      {formatDateUTCToLocalDateString(file.modifiedOn)}
                    </TableCell>
                    <TableCell>
                      {file.fileType !== "folder" && (
                        <IconButton
                          onClick={() => {
                            downloadFile(file.id, file.fileName);
                          }}
                        >
                          <CloudDownloadIcon color="primary" />
                        </IconButton>
                      )}
                      <IconButton
                        onClick={() => {
                          deleted(file.id, file.fileType === "folder");
                        }}
                      >
                        <CloseSmallIcon
                          color="disabled"
                          style={{ width: 12 }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableBody>
                ))
              ) : (
                <TableCell colSpan={8} align="center">
                  <Box>Không có dữ liệu</Box>
                </TableCell>
              )}
            </Table>
            <Box>
              <Pagintation
                pageSize={filter?.limit || 20}
                pageSizeOptions={DEFAULT_PAGESIZE_OPTIONS}
                total={data.total || 0}
                page={filter?.page || 1}
                pageChange={(
                  event: React.SyntheticEvent<HTMLElement>,
                  newPage: number
                ) => {
                  setFilter({ ...filter, page: newPage });
                }}
                pageSizeChange={(
                  event: React.SyntheticEvent<HTMLElement>,
                  newPageSize: number
                ) => {
                  setFilter({ ...filter, limit: newPageSize });
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <DialogUploadFile
        open={openDialogUploadFile}
        onClose={() => {
          setOpenDialogUploadFile(false);
        }}
        folderId={folder?.id}
        initData={initData}
      />
      <DialogCreateFolder
        open={openDialogCreateFolder}
        onClose={() => {
          setOpenDialogCreateFolder(false);
        }}
        initData={initData}
        folderId={folder?.id}
      />
      <Dialog
        open={openDialogUpdate}
        onClose={() => {
          setOpenDialogUpdate(false);
        }}
        title={"Cập nhật mô tả của file"}
        onOk={() => {
          updateFile();
        }}
        textOk={"Lưu"}
        minWidthPaper="790px"
        DialogTitleProps={{
          dividerBottom: true,
        }}
        children={
          <Box padding={"16px"}>
            <TextareaAutosize
              label="Ghi chú"
              onChange={(e) => {
                setRequest({ ...request, description: e.target.value });
              }}
              value={request?.description}
            />
          </Box>
        }
      />
      <Dialog
        open={openDialogImage}
        onClose={() => {
          setOpenDialogImage(false);
        }}
        minWidthPaper="790px"
        DialogTitleProps={{
          dividerBottom: true,
        }}
        children={
          <Box padding={"16px"}>
            <Image src={pathImage} />
          </Box>
        }
      />
    </Fragment>
  );
};

export default ListFiles;
