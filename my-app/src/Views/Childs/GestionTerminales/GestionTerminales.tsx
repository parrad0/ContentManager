import { Component } from "react";
import React from "react";
import VirtualizedTerminalsTable from "../../../Components/virtualizedTerminalsTable";
import { shop } from "../../../Entities/shop";
import store from "../../../Redux/Store/store";


class Gestionterminales extends Component<{}, { terminalDatas?: shop }> {
    constructor(props: any) {
        super(props);
        this.state = {
            terminalDatas: store.getState().currentCommerceinfo
        }
        store.subscribe(() => {
            if (this.state.terminalDatas != store.getState().currentCommerceinfo) {
                this.setState({ terminalDatas: store.getState().currentCommerceinfo });

            }

        });
    }
    render() {
        return (
            <div className="fullWidth">
                <div><p className="title-header-text">Detalle comercio</p></div>
                <hr className="granate-color"></hr>
                <div className="routingLink">
                    <span onClick={() => this._navToLink()}>Gestion Comercios</span><span className="separator">/</span><span className="linkActive">Gestion Terminales</span>
                </div>
                <div className="navBar">
                    <div className="headerNavbar">
                        <div id="comercio" className="tabNavbar active" onClick={() => this.clickTab()}>Comercio</div>
                        <div id="terminales" className="tabNavbar" onClick={() => this.clickTab()}>Terminales</div>
                    </div>
                    <div id="terminalesContent" className="contentNavbar hidden">
                        <VirtualizedTerminalsTable />
                    </div>
                    <div id="comercioContent" className="contentNavbar ">
                        <div className="textField">
                            <div className="label"><p>Número de comercio:</p></div>
                            <div className="textContent"><p>{this.state.terminalDatas?.rawObject.shopData.id}</p></div>
                        </div>
                        <div className="textField">
                            <div className="label"><p>Código País:</p></div>
                            <div className="textContent"><p>{this.state.terminalDatas?.rawObject.shopData.countryCode}</p></div>
                        </div>
                        <div className="textField">
                            <div className="label"><p>Número de licencia:</p></div>
                            <div className="textContent"><p>{this.state.terminalDatas?.rawObject.shopData.licenseNumber}</p></div>
                        </div>
                        <div className="textField">
                            <div className="label"><p>Dirección:</p></div>
                            <div className="textContent"><p>{this.state.terminalDatas?.rawObject.shopData.address}</p></div>
                        </div>
                        <div className="textField">
                            <div className="label"><p>Código postal:</p></div>
                            <div className="textContent"><p>{this.state.terminalDatas?.rawObject.shopData.postalCode}</p></div>
                        </div>
                        <div className="textField">
                            <div className="label"><p>Provincia:</p></div>
                            <div className="textContent"><p>{this.state.terminalDatas?.rawObject.shopData.province}</p></div>
                        </div>
                        <div className="textField">
                            <div className="label"><p>Localidad:</p></div>
                            <div className="textContent"><p>{this.state.terminalDatas?.rawObject.shopData.locality}</p></div>
                        </div>
                        <div className="textField">
                            <div className="label"><p>Código de estación:</p></div>
                            <div className="textContent"><p>{this.state.terminalDatas?.rawObject.shopData.stationCode}</p></div>
                        </div>
                        <div className="textField">
                            <div className="label"><p>Nombre de comercio:</p></div>
                            <div className="textContent"><p>{this.state.terminalDatas?.rawObject.shopData.commerceName}</p></div>
                        </div>
                        <div className="textField">
                            <div className="label"><p>Nombre compañia:</p></div>
                            <div className="textContent"><p>{this.state.terminalDatas?.rawObject.shopData.commerceCompanyName}</p></div>
                        </div>
                        <div className="textField">
                            <div className="label"><p>Número de remesa:</p></div>
                            <div className="textContent"><p>{this.state.terminalDatas?.rawObject.shopData.remittanceNumber}</p></div>
                        </div>
                        <div className="textField">
                            <div className="label"><p>Fecha de remesa:</p></div>
                            <div className="textContent"><p>{new Date(this.state.terminalDatas?.rawObject.shopData.accountingRemittanceDate ? this.state.terminalDatas?.rawObject.shopData.accountingRemittanceDate : "").toLocaleString()}</p></div>
                        </div>
                        <div className="textField">
                            <div className="label"><p>Número de operación remesa:</p></div>
                            <div className="textContent"><p>{this.state.terminalDatas?.rawObject.shopData.operationNumberInsideRemittance}</p></div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }

    clickTab() {
        if (document.getElementById("comercio")?.classList.contains("active")) {
            document.getElementById("comercio")?.classList.remove("active");
            document.getElementById("terminales")?.classList.add("active");
            document.getElementById("terminalesContent")?.classList.remove("hidden");
            document.getElementById("comercioContent")?.classList.add("hidden");

        } else {
            document.getElementById("terminales")?.classList.remove("active");
            document.getElementById("comercio")?.classList.add("active");
            document.getElementById("comercioContent")?.classList.remove("hidden");
            document.getElementById("terminalesContent")?.classList.add("hidden");
        }
    }
    _navToLink() {
        window.scrollTo(0, 0);
    }
}
export default Gestionterminales;