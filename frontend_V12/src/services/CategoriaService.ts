import { ABaseService } from "./ABaseService";
import type { Categoria } from "../models/Categoria";

export const CategoriaService = ABaseService<Categoria>("categorias");