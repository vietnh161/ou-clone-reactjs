import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router";
import "./select-method-detail.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export default function SelectMethodDetail() {
  const navigate = useNavigate();

  function handleClose(e: any, reason: any) {
    if (reason == "backdropClick") {
      e.stopPropagation();
      return false;
    }
    navigate("/stores");
  }

  const backToSelectStore = () => {
    navigate("/stores/123");
  };

  return (
    <Dialog
      open={true}
      className="select-method-detail-dialog"
      disableEscapeKeyDown={true}
      onClose={(e, reason) => handleClose(e, reason)}
      PaperProps={{
        sx: { width: "480px", borderRadius: "24px" },
      }}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle className="method-selector-dialog-title">
        <div className="store-info">
          <IconButton
            size="small"
            className="back-to-store-btn"
            component="label"
            onClick={backToSelectStore}
          >
            <ArrowBackIosIcon></ArrowBackIosIcon>
          </IconButton>
          <div className="store-name">Pick up</div>{" "}
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="method-selector-dialog-content">
            <div className="store-address m-b-16">  11 Hester Way, Beaumont Hills, NSW 2155 </div>
            <div className="store-time  m-b-20"> 10:00 am — 11:59 pm </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="method-item">
                <Button
                  className="method-item-btn"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  <div className="method-name"> Pre-order </div>
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="method-item">
                <Button
                  className="method-item-btn"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  <div className="method-name"> ASAP </div>
                </Button>
              </div>
            </Grid>
          </Grid>
          <Button className="skip-btn" variant="text" color="primary" fullWidth>
            Skip to menu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
