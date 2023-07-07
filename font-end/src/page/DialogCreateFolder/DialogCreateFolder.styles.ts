import { createStyles, Theme } from "@material-ui/core";
const styles = (theme: Theme) =>
  createStyles({
    dragDropFile: {
      cursor: "pointer",
      display: "flex",
    },
    deleteFile: {
      background: "white",
      width: "10px",
      marginLeft: "20px",
      color: "#747C87",
      "&:hover": {
        background: "white",
        cursor: "pointer",
      },
    },
  });

export default styles;
