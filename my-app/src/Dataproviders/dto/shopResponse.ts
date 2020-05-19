export interface shopResponse {
    id: string,
    partitionKey: string,
    shopData: shopData,
    associatedTerminals: terminal[],
    state: state
};
export interface shopData {
    id: string,
    countryCode: number,
    licenseNumber: string,
    address: string,
    postalCode: string,
    province: string,
    locality: string,
    stationCode: number,
    commerceName: string,
    commerceCompanyName: string,
    timeZoneId: string,
    remittanceNumber: string,
    accountingRemittanceDate: Date,
    operationNumberInsideRemittance: number
};
export interface terminal {
    id: number,
    terminalState: terminalState
    terminalType: terminalType,
    description: string,
    terminalNumber: number,
    turnNumber: string,
    turnDateTime: Date,
};
export interface terminalType {
    Desktop: 4,
    Mobile: 14,
    IntegratedDesktop: 15,
    SelfService: 6,
    WayletTrack: 5,
    Telemat: 13
}
export interface state {
    state: string,
    currentOperative: number,
    lastOperationTimeStamp: Date
}

export enum Operatives {
    None = 0,
    Sale,
    Refund,
    Annulation,
    PointsQuery,
    Closing,
    CardsBinding,
    PrizeExchange,
    CampaignManagement,
    PinManagement,
    NewTravelClient,
    NewEnergy,
    PricesManagement,
    Invoice,
    PinPadInitialization,
    TmeInitialization,
    TelecorRecharge,
    PointsRedemption,
    ClientDataCapture,
    Once,
    Payment,
    TelecorRechargeRefund,
}
export interface terminalState {
    cardReaderState: number,
    currentOperative: string
    lastOperationtimeStamp: string,
    frontEndState: any,
    printerState: any,
    terminalType: number,
    turnDateTime: Date,
    turnNumber: number
}