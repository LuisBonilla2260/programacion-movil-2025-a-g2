import { Factura } from "./Factura";
import { Producto } from "./Producto";

export class DetalleFactura {
  id: number;
  facturaId: Factura;
  productoId: Producto;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;

  constructor(id: number, facturaId: Factura, productoId: Producto, cantidad: number, precioUnitario: number, subtotal: number) {
    this.id = id;
    this.facturaId = facturaId;
    this.productoId = productoId;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    this.subtotal = subtotal;
  }
}
