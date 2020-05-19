import React, { Component } from 'react';
import GridviewComponent from '../../Components/gridview';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import signalr from '../../Dataproviders/signalR/signalR';
import { shopResponse } from '../../Dataproviders/dto/shopResponse';
import gestionCommerceController from '../../Controllers/gestionComercios-controller';
import store from '../../Redux/Store/store';
import { shop } from '../../Entities/shop';
import Virtualizedtable from '../../Components/virtualizedTable';
import Gestionterminales from '../Childs/GestionTerminales/GestionTerminales';

class GestionComerciosView extends Component<{}, { commerceValue: string, selectedRow: shop }> {
    _signalr: any;
    _commerceController: gestionCommerceController;
    constructor(props: any) {
        super(props);
        this._commerceController = new gestionCommerceController();
        this._signalr = signalr.init();
        this.state = {
            commerceValue: "",
            selectedRow: {}
        }

    };

    render() {
        return (
            <div className="commerces">
                <div className="halfWidthLong">
                    <div className="searchComponentWrap">
                        <div><p className="title-header-text">Buscador Comercio</p></div>
                        <hr className="granate-color"></hr>
                        <div className="routingLink">
                            <span className="linkActive">Gestion Comercios</span><span className="separator">/</span><span onClick={() => this._navToLink()} className="">Gestion Terminales</span>
                        </div>
                        <div className="searchComponent">
                            <div className="padding-search-commerce">
                                <TextField id="standard-basic" label="Nº Comercio" variant="outlined" onChange={(e) => this.changeInputValue(e)} defaultValue={this.state.commerceValue} />
                            </div>
                            <div className="padding-search-commerce">
                                <Button variant="contained" className="orangeBackground" onClick={() => this.clickSearch()}>Buscar</Button>
                            </div>
                        </div>
                    </div>
                    <div className="virtualizedComponentWrap">
                        <Virtualizedtable />
                    </div>
                </div>
                <div className="halfWidthLong">
                    <Gestionterminales />
                </div>

            </div>
        );
    }
    clickSearch() {
        this._commerceController.getCommerceData();

    }

    changeInputValue(e: any) {
        this.setState({ commerceValue: e.target.value });
    }
    _navToLink() {
        window.scrollTo(window.innerWidth, 0);
    }
}

export default GestionComerciosView;
;
