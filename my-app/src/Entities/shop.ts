import { terminal, shopResponse } from "../Dataproviders/dto/shopResponse";

export interface shop {
    commerceNumber?: string,
    denomination?: string,
    cif?: string,
    province?: string,
    village?: string,
    state?: string,
    lastDate?: string,
    currentOperative?: number
    terminals?: terminal[]
    rawObject: shopResponse
}