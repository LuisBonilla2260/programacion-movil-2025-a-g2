import { ABaseService } from "./ABaseService";
import type { Administrador } from "../models/Administrador";

export const AdministradorService = ABaseService<Administrador>("administradores");