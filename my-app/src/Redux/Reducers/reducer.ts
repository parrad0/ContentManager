import { CHANGE_STATE, UPDATE_COMMERCE, UPDATE_SELECTED_COMMERCE } from "../Actions/Constants/constants";
import { Observable } from "redux";
import { shopResponse } from "../../Dataproviders/dto/shopResponse";
import { shop } from "../../Entities/shop";

const initialState: { commercesData: shop[], currentCommerceinfo?: shop } = {

    commercesData: [],

}

function rootReducer(state = initialState, action: any) {
    if (action.type == CHANGE_STATE) {
        return {
            ...state,
            commercesData: action.commercesData
        }
    }
    if (action.type == UPDATE_COMMERCE) {
        return {
            ...state,
            updateCommerce: action.updateCommerce
        }
    }
    if (action.type == UPDATE_SELECTED_COMMERCE) {
        return {
            ...state,
            currentCommerceinfo: action.updateCommerceInfo
        }
    }
    return state;
}
export default rootReducer;