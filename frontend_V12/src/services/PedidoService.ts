import { ABaseService } from "./ABaseService";
import type { Pedido } from "../models/Pedido";

export const PedidoService = ABaseService<Pedido>("pedidos");