import React, { Component } from 'react';
import store from '../Redux/Store/store';
import { TableContainer, TableRow, TableHead, TableBody, withStyles, TableCell, TableFooter, TablePagination, IconButton, Table } from '@material-ui/core';
import { shop } from '../Entities/shop';
import { Skeleton } from '@material-ui/lab';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { shopResponse } from '../Dataproviders/dto/shopResponse';
import { Http2ServerRequest } from 'http2';
import { updateConfirm } from '../Redux/Actions/actions';

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

class GridviewComponent extends Component<{}, { data: shop[], newdata?: shopResponse[] }> {
  currentComponent: any;
  _rawData: shop[];
  constructor(props: any) {
    super(props);
    this.currentComponent = null;
    this._rawData = store.getState().commercesData
    this.state = {
      data: [],
      newdata: store.getState().updateCommerce
    }
    store.subscribe(() => {
      if (this._rawData != store.getState().commercesData) {
        console.log("consumo comercios");
        this._rawData = store.getState().commercesData;
        this.recursive();
      }
    });


  };
  componentDidMount() {
    this.currentComponent = this;
    this.recursive();
  }
  render() {
    {
      console.log("mi state");
      if (this.state.data.length > 0) {

        return (
          <div className="App" >
            <div className="gridview-container">
              <TableContainer className="maxHeight container-main">
                <Table className="" stickyHeader aria-label="customized table" size="small">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right">Nº COMERCIO</StyledTableCell>
                      <StyledTableCell align="right">DENOMINACION</StyledTableCell>
                      <StyledTableCell align="right">CIF</StyledTableCell>
                      <StyledTableCell align="right">PROVINCIA</StyledTableCell>
                      <StyledTableCell align="right">LOCALIDAD</StyledTableCell>
                      <StyledTableCell align="right">ESTADO</StyledTableCell>
                      <StyledTableCell align="right">OPERATIVA</StyledTableCell>
                      <StyledTableCell align="right">FECHA ULTIMA OP</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.values(this.state.data).map((row: shop) => (
                      <StyledTableRow key={row.commerceNumber}>
                        <StyledTableCell component="th" scope="row">
                          {row.commerceNumber}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.denomination}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.cif}</StyledTableCell>
                        <StyledTableCell align="right">{row.province}</StyledTableCell>
                        <StyledTableCell align="right">{row.village}</StyledTableCell>
                        <StyledTableCell align="right"><this.ReturnState state={row.state} /></StyledTableCell>
                        <StyledTableCell align="right">{row.currentOperative}</StyledTableCell>
                        <StyledTableCell align="right">{row.lastDate}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        );
      } else {
        return (<div className="App" >
          <div className="gridview-container">
            <TableContainer className="maxHeight" >
              <Table className="" stickyHeader aria-label="customized table" size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Nº COMERCIO</StyledTableCell>
                    <StyledTableCell align="right">DENOMINACION</StyledTableCell>
                    <StyledTableCell align="right">CIF</StyledTableCell>
                    <StyledTableCell align="right">PROVINCIA</StyledTableCell>
                    <StyledTableCell align="right">LOCALIDAD</StyledTableCell>
                    <StyledTableCell align="right">ESTADO</StyledTableCell>
                    <StyledTableCell align="right">FECHA ULTIMA OP</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width={210} height={118} />
                  <Skeleton variant="text" width={210} height={118} />
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>);
      }
    }

  }
  ReturnState(request: any) {
    switch (request.state) {
      case 99: { return (<div className="flexContainer"><span>Desconocido</span><FiberManualRecordIcon className="grey" /></div >); }
      case 0: { return (<div className="flexContainer"><span>Sin inicializar</span><FiberManualRecordIcon className="grey" /></div>); }
      case 1: { return (<div className="flexContainer"><span>Desconectado</span><FiberManualRecordIcon className="dark" /></div>); }
      case 2: { return (<div className="flexContainer"><span>Deshabilitado</span><FiberManualRecordIcon className="grey" /></div>); }
      case 3: { return (<div><span>Inoperativo</span><FiberManualRecordIcon className="red" /></div >); }
      case 10: {
        return (<div><span>Operativo</span><FiberManualRecordIcon className="darkGreen" /></div>)
      }
      case 11: { return (<div className="flexContainer"><span>Parcialmente operativo</span><FiberManualRecordIcon className="blue" /></div >); }
      case 19: { return (<div className="flexContainer"><span>Operativo con problemas</span><FiberManualRecordIcon className="orange" /></div>); }
      default: {
        return (<div className="flexContainer"><span>Desconocido</span><FiberManualRecordIcon className="grey" /></div>);
      }
    }
  }
  parsingDate(request: any) {
    console.log("LA FECHA");
    console.log(request);
    return request.toString();
  }
  recursive() {
    setTimeout(() => {
      let hasMore = this.state.data.length + 1 < this._rawData.length;
      this.setState((prev) => ({
        data: this._rawData.slice(0, prev.data.length + 1)
      }));
      if (hasMore) this.recursive();
    }, 0);
  }
}
export default GridviewComponent;
