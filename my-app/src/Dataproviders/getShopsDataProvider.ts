import signalr from "./signalR/signalR";
import { shopResponse } from "./dto/shopResponse";
import environment from "../Configuration/environment";
import { shop } from "../Entities/shop";
import formarHelper from "./formatHelper/formatHelper";

class getShopsDataProvider {

    async getAllShops(): Promise<shop[]> {

        let response: shopResponse[] = await signalr.instance.sendMessageToBack(environment.hubMethodsInvoke.GetShops);
        return formarHelper.formatHelperShopResponse(response);
    }
}
export default getShopsDataProvider;