import { Component } from "react";
import { AutoSizer, Table, Column } from "react-virtualized";
import React from "react";
import { shop } from "../Entities/shop";
import store from "../Redux/Store/store";


class VirtualizedTerminalsTable extends Component<{}, { terminalDatas?: shop }> {
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
        console.log(this.state.terminalDatas?.terminals);
        this.state.terminalDatas?.terminals ? console.log("i am true so no fukcing idea") : console.log("no tengo info false");
        return (

            <AutoSizer>
                {({ width, height }) => (
                    <Table
                        // onHeaderClick={({ columnData, dataKey, event }) => this.setState({ sortedList: this._sortList(dataKey) })}
                        // onRowClick={this._clikRow}
                        headerClassName="headerColumnClass"
                        rowClassName={this._rowClassName}
                        ref="Table"
                        width={width}
                        height={height}
                        headerHeight={30}
                        rowHeight={40}
                        rowCount={this.state.terminalDatas?.terminals?.length ? this.state.terminalDatas.terminals.length : 0}
                        rowGetter={({ index }) => this.state.terminalDatas?.terminals ? this.state.terminalDatas.terminals[index] : {}}
                    >
                        <Column
                            label='Nº Terminal'
                            dataKey='terminalNumber'
                            width={300}
                        />
                        <Column
                            label='TIPO'
                            dataKey="terminalState"
                            cellRenderer={({ rowData }) => this._returnTerminalType(rowData)}
                            width={300}
                        />
                        <Column
                            label='ESTADO'
                            dataKey="terminalState"
                            cellRenderer={({ rowData }) => this._returnOperativeType(rowData)}
                            width={300}
                        />
                        <Column
                            label='FECHA ULTIMA OP'
                            dataKey='turnDateTime'
                            cellRenderer={({ rowData }) => this._returnFormatedDate(rowData)}
                            width={300}
                        />
                    </Table>
                )}
            </AutoSizer>

        );

    }
    _rowClassName({ index }: any) {
        if (index < 0) {
            return "headerColumnClass";
        } else {
            return index % 2 === 0 ? "rowClassName" : "rowClassNameImpar";
        }
    }
    _getstate() {

    }
    _returnOperativeType(operative: any) {
        switch (operative.terminalState.cardReaderState) {
            case 0: { return "Desconectado" }
            case 1: { return "Inicializando" }
            case 2: { return "Reposo" }
            case 3: { return "Leyendo" }
            case 4: { return "Track2Reading" }
            case 5: { return "Procesando lectura" }
            case 6: { return "Procesando track2Reading" }
            case 7: { return "Esperando solicitud de lectura" }
            case 8: { return "Procesando firma" }
            case 9: { return "Procesando pin" }
            case 10: { return "Procesando confirmación transación" }
            case 11: { return "Leyendo validación numero telefono" }
            case 12: { return "Inoperativo" }
            case 13: { return "Esperando tras reactivación" }
            default: { return "Default" }
        }

    }
    _returnTerminalType(operative: any) {

        switch (operative.termianlType) {
            case 4: { return "Escritorio" }
            case 5: { return "Waylet pista" }
            case 6: { return "Autoservicio" }
            case 13: { return "Telemat" }
            case 14: { return "Móvil" }
            case 15: { return "Integrado" }
            default: { return "Default" }
        }

    }
    _returnFormatedDate(date: any) {
        console.log("this is my date", date);
        return new Date(date.terminalState.lastOperationTimeStamp).toLocaleString()
    }
}
export default VirtualizedTerminalsTable;