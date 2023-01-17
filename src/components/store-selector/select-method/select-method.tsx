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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MethodEnum, methodKeys } from "../../../data/enums/method.enum";
import storeService from "../../../services/store.service";
import moment from "moment";
import slugify from "slugify";

export type SelectMethodType = {
  method: MethodEnum;
  disabled: boolean;
  estimate: string;
  hidden: boolean;
};

export function SelectMethod({ stores }: any) {
  const [store, setStore] = useState<any>(undefined);
  const [listMethod, setListMethod] = useState<SelectMethodType[]>([]);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (stores === undefined) return;
    if (stores === null) {
      backToSelectStore();
      return;
    }
    const curStore = getStoreBySlug(params.id);
    setStore(curStore);
  }, [params.id, stores]);

  useEffect(() => {
    if (store === undefined) return;
    if (store === null) {
      backToSelectStore();
      return;
    }
    const lstMethod: SelectMethodType[] = [];
    for (const key in methodKeys) {
      const element = methodKeys[key];
      const selectMethod: SelectMethodType = {
        method: +key,
        disabled: false,
        hidden: true,
        estimate: "",
      };
      if (store) {
        if (
          store[`${element.key}_available`] === 1 &&
          store[`${element.key}_hidden`] === 0
        ) {
          selectMethod.hidden = false;
        }
        if (store[`${element.key}_allow_show_estimated_time`] === 1) {
          selectMethod.estimate = storeService.getMethodTimeOut(
            +key,
            moment().day(),
            store
          );
        }
      }
      lstMethod.push(selectMethod);
    }
    setListMethod(lstMethod);
  }, [store]);

  function getStoreBySlug(storeSlug?: string) {
    const storeId = storeSlug?.split("-").reverse()[0];
    return stores && storeId ? stores[storeId] || null : null;
  }

  function handleClose(e: any, reason: any) {
    if (reason === "backdropClick") {
      e.stopPropagation();
      return false;
    }
    navigate("/stores");
  }

  function backToSelectStore() {
    navigate("/stores");
  }

  function selectStoreMethod(method: SelectMethodType) {
    const methodSlug = slugify(
      store[`${methodKeys[method.method].key}_label`] ||
        methodKeys[method.method].defaultLabel,
      {
        lower: true,
        remove: /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
        strict: false,
      }
    );
    navigate(`${window.location.pathname}/${methodSlug}`);
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
          {store ? (
            <div className="address">
              <p className="name text-16 text-normal">
                {store.store_address_unit}&nbsp;
                {store.store_address_street},&nbsp;{store.store_address_suburb}
                ,&nbsp;
                {store.store_address_state}&nbsp;
                {store.store_address_postcode}
              </p>
            </div>
          ) : (
            ""
          )}
          <Grid container spacing={2}>
            {listMethod.map((method) => {
              return !method.hidden ? (
                <Grid item xs={12} key={method.method}>
                  <div className="method-item">
                    <Button
                      className="method-item-btn"
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => selectStoreMethod(method)}
                    >
                      <div className="method-name">
                        {store[`${methodKeys[+method.method].key}_label`] ||
                          methodKeys[+method.method].defaultLabel}
                      </div>
                      <div className="estimate">{method.estimate}</div>
                    </Button>
                  </div>
                </Grid>
              ) : (
                ""
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

const mapStateToProps = (state: any) => ({ stores: state.storeReducer.stores });
export default connect(mapStateToProps, {})(SelectMethod);
