import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import _ from "lodash";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import slugify from "slugify";
import { methodKeys } from "../../../data/enums/method.enum";
import storeService from "../../../services/store.service";
import "./select-location.scss";

export function SelectLocaion({ stores }: any) {
  const navigate = useNavigate();
  let storesList: any = [];
  if (stores) {
    storesList = _.values(stores)?.map((store) => {
      return {
        ...store,
        isStoreAvailable: storeService.isStoreAvailable(store),
      };
    });
  }

  function handleClose(e: any, reason: any) {
    if (reason == "backdropClick") {
      e.stopPropagation();
      return false;
    }
    navigate("/");
  }

  function selectStore(store: any) {
    const storeSlug =
    slugify(store.store_name, {
      lower: true,
      remove: /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
      strict: false,
    }) + `-${store.store_id}`;
    navigate(`/stores/${storeSlug}`);
  }

  function skipToMenu() {
    console.log("skipToMenu");
  }

  function lessThanSixStores() {
    return (
      <Grid container spacing={2}>
        {storesList.map((store: any, index: number) => {
          return (
            <Grid item xs={6} key={index}>
              <div className={"store-item"}>
                <Button
                  className={`store-item-btn`}
                  variant="contained"
                  disabled={store.isStoreAvailable ? false : true}
                  color="primary"
                  fullWidth
                  onClick={() => selectStore(store)}
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
    );
  }

  function moreThanSixStores() {
    return (
      <div className="lt-six-stores">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select store</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={(event: any) => selectStore(event.target.value)}
          >
            {storesList.map((store: any, index: number) => {
              return (
                <MenuItem key={index} value={store}>
                  {store.store_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
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
          {storesList.length <= 6 ? lessThanSixStores() : moreThanSixStores()}
          <Button
            className="skip-btn"
            variant="text"
            color="primary"
            fullWidth
            onClick={skipToMenu}
          >
            Skip to menu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state: any) => ({ stores: state.storeReducer.stores });

export default connect(mapStateToProps, {})(SelectLocaion);
