import * as signalR from "@microsoft/signalr";
import environment from "../../Configuration/environment";
import { shopResponse } from "../dto/shopResponse";
import store from "../../Redux/Store/store";
import { updateCommerce } from "../../Redux/Actions/actions";
import signalRResponseController from "../../Controllers/signalRResponseController";

class signalr {
    static _instance: signalr;
    connection: any;
    _signalrResponseController: signalRResponseController;
    constructor() {
        console.log("inicializando conexion");
        this.startConection();
        this._signalrResponseController = new signalRResponseController();
    }
    async startConection() {
        if (this.connection == null) {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(
                    environment.url + "/" + environment.hubName, { transport: signalR.HttpTransportType.WebSockets }
                )
                .configureLogging(signalR.LogLevel.Trace)
                .build();

            console.log(JSON.stringify(this.connection));
            this.connection.on(
                environment.hubMethodsListeners.AddedShopsNotificationFromBack,
                function (e) {
                    console.log("[SINGALR] recive AddedShop((sNoti" + JSON.stringify(e));

                }
            );

            this.connection.on(
                environment.hubMethodsListeners.UpdatedShopsNotificationFromBack,
                function (e: any) {
                    console.log("[SINGALR] recive update" + JSON.stringify(e));
                    signalr.instance._signalrResponseController.updateCommerce(e);
                }
            );

            this.connection.on(
                environment.hubMethodsListeners.DeletedShopsNotificationFromBack,
                function (e) {
                    console.log("[SINGALR] recive" + e);
                }
            );

            try {
                await this.connection.start();
                console.log("connected");
            } catch (err) {
                console.log(err);
                setTimeout(() => this.startConection(), 2000);
            }
        };

        this.connection.onclose(async () => {
            await this.startConection();
        });

    }
    public static init(): void {
        console.log("init signalr");
        if (signalr._instance === undefined) {
            signalr._instance = new signalr();
        }
    }

    public static get instance(): signalr {
        if (signalr._instance === undefined) {
            throw new Error('Error: Instantiation failed: Do not use <new>. Call the init() method at the initialisation.');
        }
        return signalr._instance;
    }
    async sendMessageToBack(request: any): Promise<any> {
        let output: any;
        await this.connection.invoke(
            request
        ).then((e: any) => output = e).catch((e) => console.log("[SIGNALR]", e));
        return output;
    }
}
export default signalr;