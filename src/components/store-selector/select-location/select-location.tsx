import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router";
import "./select-location.scss";

export default function SelectLocaion() {
  const navigate = useNavigate();

  function handleClose(e: any, reason: any) {
    if (reason == "backdropClick") {
      e.stopPropagation();
      return false;
    }
    navigate("/");
  }

  return (
    <Dialog
      open={true}
      className="store-selector-dialog"
      disableEscapeKeyDown={true}
      onClose={(e, reason) => handleClose(e, reason)}
      PaperProps={{
        sx: { width: "600px", borderRadius: "24px" },
      }}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="store-selector-dialog-title">Select Locaion</DialogTitle>
      <DialogContent>
        <div className="store-selector-dialog-content">
          <Grid container spacing={2}>
            {[1, 2, 3].map((x) => {
              return (
                <Grid item xs={6}>
                  <div className="store-item">
                    <Button
                      className="store-item-btn"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      <div className="store-img">
                        <img
                          src="https://d7xy6ff1t9nxr.cloudfront.net/hoteldemotwo.orderup.net.au/images/theme/logo/default/greenvillelogo-email.png"
                          alt=""
                        />
                      </div>
                      <div className="store-name"> Greenville Hotel New </div>
                    </Button>
                  </div>
                </Grid>
              );
            })}
          </Grid>

          <Button
            className="skip-btn"
            variant="text"
            color="primary"
            fullWidth
          >
            Skip to menu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
