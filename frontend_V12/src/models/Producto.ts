import { Categoria } from "./Categoria";

export class Producto {
  id: number;
  nombreProducto: string;
  precio: number;
  descripcion: string;
  status: boolean; // <-- Usa el tipo primitivo 'boolean'
  categoriaId: Categoria;

  constructor(
    id: number,
    nombreProducto: string,
    precio: number,
    descripcion: string,
    status: boolean, // <-- Usa el tipo primitivo 'boolean'
    categoriaId: Categoria
  ) {
    this.id = id;
    this.nombreProducto = nombreProducto;
    this.precio = precio;
    this.descripcion = descripcion;
    this.status = status;
    this.categoriaId = categoriaId;
  }

}
