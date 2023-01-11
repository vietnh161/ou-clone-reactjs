import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router";
import "./select-method.scss";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
export default function SelectMethod() {
  const navigate = useNavigate();

  function handleClose(e: any, reason: any) {
    if (reason == "backdropClick") {
      e.stopPropagation();
      return false;
    }
    navigate("/stores");
  }

   const backToSelectStore = () => {
    navigate("/stores");
  }


  return (
    <Dialog
      open={true}
      className="method-selector-dialog"
      disableEscapeKeyDown={true}
      onClose={(e, reason) => handleClose(e, reason)}
      PaperProps={{
        sx: { width: "480px", borderRadius: "24px" },
      }}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle className="method-selector-dialog-title">
        <div className="store-logo">
          <img
            src="https://d7xy6ff1t9nxr.cloudfront.net/hoteldemotwo.orderup.net.au/images/theme/logo/default/greenvillelogo-email.png"
            alt=""
          />
        </div>
        <div className="store-info">
          <IconButton
            size="small"
            className="back-to-store-btn"
            component="label"
            onClick={backToSelectStore}
          >
            <ArrowBackIosIcon></ArrowBackIosIcon>
          </IconButton>
          <div className="store-name">Greenville Hotel New</div>{" "}
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="method-selector-dialog-content">
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((x) => {
              return (
                <Grid item xs={12}>
                  <div className="method-item">
                    <Button
                      className="method-item-btn"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      <div className="method-name"> Greenville Hotel New </div>
                    </Button>
                  </div>
                </Grid>
              );
            })}
          </Grid>

          <Button className="skip-btn" variant="text" color="primary" fullWidth>
            Skip to menu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
