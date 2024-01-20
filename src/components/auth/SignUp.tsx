import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import SignUpContentBox from "./authComponents/SignUpContentBox";
import { useDispatch } from "react-redux";
import { openLogin } from "@/src/redux/reducer/actionDataReducer";

export default function SignUp(props: any) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.setOpenSignUp(false);
    dispatch(openLogin(false));
  };

  React.useEffect(() => {
    setOpen(props.openSignUp);
  }, [props.openSignUp]);

  return (
    <div className="w-full">
      <Button
        sx={{
          textTransform: "unset",
          fontSize: "14px",
          fontWeight: "400",
          color: "white",
          whiteSpace: "nowrap",
          opacity: "1",
          px: 2,
          borderRadius: "6px",
        }}
        className={`bg_linear ${props?.width && "w-[100%]"}`}
        onClick={handleClickOpen}
      >
        Sign up
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <SignUpContentBox
          setOpenSignUp={props.setOpenSignUp}
          setOpenLogin={props.setOpenLogin}
          setOpen={setOpen}
          handleClose={handleClose}
        />
      </Dialog>
    </div>
  );
}
