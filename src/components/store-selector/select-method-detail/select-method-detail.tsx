import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import "./select-method-detail.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import { MethodEnum, methodKeys } from "../../../data/enums/method.enum";
import { connect } from "react-redux";
import slugify from "slugify";
import { SelectMethodType } from "../select-method/select-method";
import moment from "moment";
import storeService from "../../../services/store.service";
export type SelectMethodDetailType = {
  type: "asap" | "pre-order",
  hidden: boolean,
  disable: boolean
}
export function SelectMethodDetail({ stores }: any) {
  const [store, setStore] = useState<any>(undefined);
  const [method, setMethod] = useState<SelectMethodType | undefined>(undefined);
  const [methodDetailType, setMethodDetailType] = useState<
  SelectMethodDetailType | undefined
  >(undefined);
  const [storeSession, setStoreSession] = useState<
    { onlineHourSessionone: string; onlineHourSessiontwo: string } | undefined
  >(undefined);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (stores === undefined) return;
    if (stores === null) {
      backToSelectStore();
      return;
    }
    const curStore = getStoreBySlug(params.sid);
    setStore(curStore);
  }, [params.id, stores]);

  useEffect(() => {
    if (store === undefined) return;
    if (store === null) {
      backToSelectStore();
      return;
    }

    const methodId = getMethodBySlug(params.mid);
    if (methodId > 0) {
      const selectMethod: SelectMethodType = {
        method: methodId,
        disabled: false,
        hidden: true,
        estimate: "",
      };

      if (
        store[`${methodKeys[methodId].key}_available`] === 1 &&
        store[`${methodKeys[methodId].key}_hidden`] === 0
      ) {
        selectMethod.hidden = false;
      }
      if (
        store[`${methodKeys[methodId].key}_allow_show_estimated_time`] === 1
      ) {
        selectMethod.estimate = storeService.getMethodTimeOut(
          methodId,
          moment().day(),
          store
        );
      }
      const storeSessionOne =
        store.hours[`${methodKeys[methodId].key}`]?.sessionone;
      const storeSessionTwo =
        store.hours[`${methodKeys[methodId].key}`]?.sessiontwo;
      let onlineHourSessionone = "",
        onlineHourSessiontwo = "";
      onlineHourSessionone = storeService.getOnlineHour(
        storeSessionOne?.find((x: any) => x.dow == moment().day())
      );
      if (store.hours_type == 2) {
        onlineHourSessiontwo = storeService.getOnlineHour(
          storeSessionTwo?.find((x: any) => x.dow == moment().day())
        );
      }

      setMethod(selectMethod);
      setStoreSession({ onlineHourSessionone, onlineHourSessiontwo });
    }
  }, [store]);

  function getStoreBySlug(storeSlug?: string) {
    const storeId = storeSlug?.split("-").reverse()[0];
    return stores && storeId ? stores[storeId] || null : null;
  }

  function getMethodBySlug(methodSlugParam?: string) {
    for (const key in methodKeys) {
      const methodKey = methodKeys[key];
      const methodSlug = slugify(
        store[`${methodKey.key}_label`] || methodKey.defaultLabel,
        {
          lower: true,
          remove: /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
          strict: false,
        }
      );
      if (methodSlug == methodSlugParam) {
        return +key;
      }
    }
    return 0;
  }

  function handleClose(e: any, reason: any) {
    if (reason == "backdropClick") {
      e.stopPropagation();
      return false;
    }
    navigate("/stores");
  }

  const backToSelectMethod = () => {
    const storeSlug =
      slugify(store.store_name, {
        lower: true,
        remove: /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
        strict: false,
      }) + `-${store.store_id}`;
    navigate(`/stores/${storeSlug}`);
  };
  const backToSelectStore = () => {
    navigate("/stores");
  };

  return (
    store &&
    method && (
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
              onClick={backToSelectMethod}
            >
              <ArrowBackIosIcon></ArrowBackIosIcon>
            </IconButton>
            <div className="store-name">
              {store[`${methodKeys[method.method].key}_label`] ||
                methodKeys[method.method].defaultLabel}
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="method-selector-dialog-content">
            <div className="store-address m-b-16">
              {store.store_address_unit}&nbsp;
              {store.store_address_street},&nbsp;{store.store_address_suburb}
              ,&nbsp;
              {store.store_address_state}&nbsp;
              {store.store_address_postcode}
            </div>
            {storeSession?.onlineHourSessionone && (
              <div className="store-time  m-b-20">
                {" "}
                {storeSession.onlineHourSessionone}{" "}
              </div>
            )}
            {storeSession?.onlineHourSessiontwo && (
              <div className="store-time  m-b-20">
                {" "}
                {storeSession.onlineHourSessiontwo}{" "}
              </div>
            )}
            {method.estimate && (
              <div className="prep-time  m-b-20">
                <span className="text-16 text-normal">
                  Minimum preparation time
                </span>
                <span className="text_description text-16 text-right">
                  {method.estimate}
                </span>
              </div>
            )}
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
    )
  );
}

const mapStateToProps = (state: any) => ({ stores: state.storeReducer.stores });
export default connect(mapStateToProps, {})(SelectMethodDetail);
