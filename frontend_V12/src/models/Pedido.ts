import { Administrador } from "./Administrador";
import { Empleado } from "./Empleado";
import { Producto } from "./Producto";

export class Pedido {
  id: number;
  fecha: string;
  estado: boolean;
  administradorId?: Administrador;
  empleadoId?: Empleado;
  productoId: Producto;

  constructor(id: number, fecha: string, estado: boolean, administradorId: Administrador, empleadoId: Empleado, productoId: Producto) {
    this.id = id;
    this.fecha = fecha;
    this.estado = estado;
    this.administradorId = administradorId;
    this.empleadoId = empleadoId;
    this.productoId = productoId;
  }
}
