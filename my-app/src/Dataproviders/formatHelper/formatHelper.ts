import { shopResponse } from "../dto/shopResponse";
import { shop } from "../../Entities/shop";

class formarHelper {
    static formatHelperShopResponse(request: shopResponse[]): shop[] {
        let output: shop[] = [];

        request.forEach((e: shopResponse) => {

            output.push({
                commerceNumber: e.shopData.id,
                denomination: e.shopData.commerceCompanyName,
                cif: e.shopData.commerceName,
                province: e.shopData.province,
                village: e.shopData.locality,
                state: e.state.state,
                currentOperative: e.state.currentOperative,
                lastDate: new Date(e.state.lastOperationTimeStamp).toLocaleString(),
                terminals: e.associatedTerminals,
                rawObject: e
            });
        }
        );

        return output;
    }
}
export default formarHelper;