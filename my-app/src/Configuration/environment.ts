import { HubConnection } from "@microsoft/signalr";

var environment = {

    url: "https://dev-scp.repsol.everiscloudpayments.com/tms-monitoring",
    hubName: "shopMonitoringHub",
    hubMethodsListeners: {
        DeletedShopsNotificationFromBack: "DeletedShopsNotificationFromBack",
        UpdatedShopsNotificationFromBack: "UpdatedShopsNotificationFromBack",
        AddedShopsNotificationFromBack: "AddedShopsNotificationFromBack",
    },
    hubMethodsInvoke: {
        GetShops: "GetShops"
    }

}
export default environment;