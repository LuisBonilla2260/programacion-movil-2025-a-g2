import { Pedido } from "./Pedido";

export class Factura {
  id: number;
  fecha: string;
  total: number;
  pedidoId: Pedido;

  constructor(id: number, fecha: string, total: number, pedidoId: Pedido) {
    this.id = id;
    this.fecha = fecha;
    this.total = total;
    this.pedidoId = pedidoId;
  }
}
