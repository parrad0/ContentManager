import { CHANGE_STATE, UPDATE_COMMERCE, UPDATE_SELECTED_COMMERCE } from "./Constants/constants";
import { shop } from "../../Entities/shop";
import { shopResponse } from "../../Dataproviders/dto/shopResponse";

export function changeStateAction(payload: shop[]) {
    return { type: CHANGE_STATE, commercesData: payload };
}
export function updateCommerce(payload: shopResponse) {
    return { type: UPDATE_COMMERCE, updateCommerce: payload };
}
export function updateConfirm() {
    return { type: UPDATE_COMMERCE, updateCommerce: undefined };
}
export function updateClickedCommerce(payload: shop) {
    return { type: UPDATE_SELECTED_COMMERCE, updateCommerceInfo: payload };
}