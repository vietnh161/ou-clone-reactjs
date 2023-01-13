import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import _ from "lodash";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import "./select-location.scss";

export function SelectLocaion({stores} : any ) {
  const navigate = useNavigate();
  let storesList : any = [];
  if(stores) {
    storesList = _.values(stores);
  }

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
            {storesList.map((store: any, index: number) => {
              return (
                <Grid item xs={6} key={index}>
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
                      <div className="store-name"> {store.store_name} </div>
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


const mapStateToProps = (state : any) => ({stores: state.storeReducer.stores})

export default connect(mapStateToProps, {})(SelectLocaion)