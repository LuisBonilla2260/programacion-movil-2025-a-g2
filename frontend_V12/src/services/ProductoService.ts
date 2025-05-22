import { ABaseService } from "./ABaseService";
import type { Producto } from "../models/Producto";

export const ProductoService = ABaseService<Producto>("productos");
