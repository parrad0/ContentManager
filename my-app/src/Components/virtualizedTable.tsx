import React, { Component } from 'react';
import { AutoSizer, Table, Column, SortDirection } from "react-virtualized";
import { shop } from '../Entities/shop';
import store from '../Redux/Store/store';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { withStyles, TableCell, TableRow } from '@material-ui/core';
import "react-virtualized/styles.css";
import gestionCommerceController from '../Controllers/gestionComercios-controller';
import { updateClickedCommerce } from '../Redux/Actions/actions';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#032580",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 11,
    },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

class Virtualizedtable extends Component<{}, { data: shop[], sortedList: shop[] }> {
    _commerceController: gestionCommerceController;
    sortBy: any;
    sortDirection: any;
    constructor(props: any) {
        super(props);
        this._commerceController = new gestionCommerceController()
        this.sortBy = "index";
        this.sortDirection = SortDirection.ASC;
        this.state = {
            data: store.getState().commercesData,
            sortedList: this._sortList()
        };
        store.subscribe(() => {
            if (this.state.sortedList != store.getState().commercesData) {
                console.log("consumo comercios");
                console.log(JSON.stringify(store.getState().commercesData));
                this.setState({ sortedList: this._sortList(store.getState().commercesData) });
            }
        });
    };
    componentDidMount() {
        try {

            this._commerceController.getCommerceData();
        } catch (e) { setTimeout(() => this._commerceController.getCommerceData(), 2000); }

    }

    render() {

        return (
            <div className="fullWidth">
                <AutoSizer>
                    {({ width, height }) => (

                        <Table
                            onHeaderClick={({ columnData, dataKey, event }) => this.setState({ sortedList: this._sortList(dataKey) })}
                            onRowClick={this._clikRow}
                            headerClassName="headerColumnClass"
                            rowClassName={this._rowClassName}
                            ref="Table"
                            width={width}
                            height={height}
                            headerHeight={30}
                            rowHeight={40}
                            rowCount={this.state.sortedList.length}
                            rowGetter={({ index }) => this.state.sortedList[index]}
                        >
                            <Column
                                label='Nº Comercio'
                                dataKey='commerceNumber'
                                width={150}
                            />
                            <Column
                                label='DENOMINACIÓN'
                                dataKey='denomination'
                                width={300}
                            />
                            <Column
                                label='CIF'
                                dataKey='cif'
                                width={400}
                            />
                            <Column
                                label='PROVINCIA'
                                dataKey='province'
                                width={300}
                            />
                            <Column
                                label='CIUDAD'
                                dataKey='village'
                                width={300}
                            />
                            <Column
                                label='ESTADO'
                                dataKey='state'
                                width={300}
                                cellRenderer={({ rowData }) => <this.ReturnState state={rowData} />}
                            />
                            <Column
                                label='ULTIMA OPERACIÓN'
                                dataKey='lastDate'
                                width={300}
                            />
                            <Column
                                label='OPERACIÓN ACTUAL'
                                dataKey='currentOperative'
                                cellRenderer={({ rowData }) => this.returnCurrentOperative(rowData)}
                                width={300}
                            />
                        </Table>
                    )}
                </AutoSizer>
            </div>
        );

    }

    _clikRow({ event, index, rowData }: any) {
        console.log("click in a row", rowData);
        store.dispatch(updateClickedCommerce(rowData));
        console.log(window.innerWidth);
        window.scrollTo(window.innerWidth, 0);
    }
    returnCurrentOperative(rowData: shop) {
        console.log(rowData);
        switch (rowData.currentOperative) {
            case 0: { return "Ninguna" }
            case 1: { return "Venta" }
            case 2: { return "Devolución" }
            case 3: { return "Anulación" }
            case 4: { return "Solicitud puntos" }
            case 5: { return "Cierres" }
            case 6: { return "Vinculación de tarjetas" }
            case 7: { return "Cambio de precios" }
            case 8: { return "Manejo de campañas" }
            case 9: { return "Manejo de pin" }
            case 10: { return "Nuevo cliente travel" }
            case 11: { return "Nuevo energy" }
            case 12: { return "Manejo de precios" }
            case 13: { return "Factura" }
            case 14: { return "Inicialización pinpad" }
            case 15: { return "TME inicialización" }
            case 16: { return "Recarga Telecor" }
            case 17: { return "Redención puntos" }
            case 18: { return "Captura datos cliente" }
            case 19: { return "Once" }
            case 20: { return "Pago" }
            case 21: { return "Recarga Telecor devolución" }
            case 22: { }
        }
    }
    _sortList(sortBy?: any | undefined) {
        let data = store.getState().commercesData;
        console.log(sortBy);
        switch (sortBy) {
            case "province": {
                console.log("ProvinceINside");

                return data
                    .sort((item1: any, item2: any) => {
                        if (item1.province < item2.province) { return -1; }
                        if (item1.province > item2.province) { return 1; }
                        return 0;



                    })
                    ;
            }
            default: {
                console.log("Default");
                return data
                    .sort((item1: any, item2: any) =>
                        item2.state - item1.state




                    )
                    ;
            }
        }
    }
    _rowClassName({ index }: any) {
        if (index < 0) {
            return "headerColumnClass";
        } else {
            return index % 2 === 0 ? "rowClassName" : "rowClassNameImpar";
        }
    }
    ReturnState(request: any) {
        switch (request.state.state) {
            case 99: { return (<div className="flexContainer"><span>Desconocido</span><FiberManualRecordIcon className="grey" /></div >); }
            case 0: { return (<div className="flexContainer"><span>Sin inicializar</span><FiberManualRecordIcon className="grey" /></div>); }
            case 1: { return (<div className="flexContainer"><span>Desconectado</span><FiberManualRecordIcon className="dark" /></div>); }
            case 2: { return (<div className="flexContainer"><span>Deshabilitado</span><FiberManualRecordIcon className="grey" /></div>); }
            case 3: { return (<div className="flexContainer"><span>Inoperativo</span><FiberManualRecordIcon className="red" /></div>); }
            case 10: { return (<div className="flexContainer"><span>Operativo</span><FiberManualRecordIcon className="darkGreen" /></div>); }
            case 11: { return (<div className="flexContainer"><span>Parcialmente operativo</span><FiberManualRecordIcon className="blue" /></div >); }
            case 19: { return (<div className="flexContainer"><span>Operativo con problemas</span><FiberManualRecordIcon className="orange" /></div>); }
            default: {
                return (<div className="flexContainer"><span>Desconocido</span><FiberManualRecordIcon className="grey" /></div>);
            }
        }
    }

}
export default Virtualizedtable;