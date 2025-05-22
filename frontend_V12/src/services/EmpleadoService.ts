import { ABaseService } from "./ABaseService";
import type { Empleado } from "../models/Empleado";

export const EmpleadoService = ABaseService<Empleado>("empleados");