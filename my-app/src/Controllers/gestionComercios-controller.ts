import getShopsDataProvider from "../Dataproviders/getShopsDataProvider";
import { shopResponse } from "../Dataproviders/dto/shopResponse";
import { shop } from "../Entities/shop";
import store from "../Redux/Store/store";
import { changeStateAction } from "../Redux/Actions/actions";

class gestionCommerceController {
    async getCommerceData() {
        try {
            console.log("comercios solicitados");
            let shopDataProvider: getShopsDataProvider = new getShopsDataProvider();
            let shopsResponse: shop[] = await shopDataProvider.getAllShops();
            store.dispatch(changeStateAction(shopsResponse));
        }
        catch (e) { setTimeout(() => this.getCommerceData(), 1000); }
    }
}
export default gestionCommerceController;