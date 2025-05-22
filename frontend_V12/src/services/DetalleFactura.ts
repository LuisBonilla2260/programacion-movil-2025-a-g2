import { ABaseService } from "./ABaseService";
import type { DetalleFactura } from "../models/DetalleFactura";

export const DetalleFacturaService = ABaseService<DetalleFactura>("DetalleFactura");