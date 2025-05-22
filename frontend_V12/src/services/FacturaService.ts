import { ABaseService } from "./ABaseService";
import type { Factura } from "../models/Factura";

export const FacturasService = ABaseService<Factura>("facturas");