import { shopResponse } from "../Dataproviders/dto/shopResponse";
import { shop } from "../Entities/shop";
import store from "../Redux/Store/store";
import { changeStateAction } from "../Redux/Actions/actions";

class signalRResponseController {
    updateCommerce(request: shopResponse[]) {
        console.log(request);
        let shopsUpdated: shop[] = [];
        request?.forEach((e) => {
            shopsUpdated.push({
                commerceNumber: e.shopData.id,
                denomination: e.shopData.commerceCompanyName,
                cif: e.shopData.commerceName,
                province: e.shopData.province,
                village: e.shopData.locality,
                state: e.state.state,
                currentOperative: e.state.currentOperative,
                lastDate: new Date(e.state.lastOperationTimeStamp).toLocaleString()
            });

        });
        //REDRAW
        console.log("entro en el mapeo del nuevo estado");
        let currentData: shop[] = Object.assign({}, store.getState().commercesData);
        let newData: shop[] = [];
        shopsUpdated.forEach((s) =>
            Object.values(currentData).forEach((r: shop) => {

                if (r.commerceNumber == s.commerceNumber) { r = s; console.log("nuevo valor cambiado", r); newData.push(s); } else {
                    newData.push(r);
                }
            })
        );
        console.log("current new data to update", newData);
        store.dispatch(changeStateAction(newData));

    }
}
export default signalRResponseController;