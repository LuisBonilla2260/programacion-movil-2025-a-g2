// src/store/cart.ts
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    carrito: {} as Record<number, number>  // productoId => cantidad
  }),

  actions: {
    agregar(productoId: number) {
      if (!this.carrito[productoId]) this.carrito[productoId] = 0
      this.carrito[productoId]++
    },

    quitar(productoId: number) {
      if (this.carrito[productoId]) {
        this.carrito[productoId]--
        if (this.carrito[productoId] <= 0) delete this.carrito[productoId]
      }
    },

    cantidadPorProducto(productoId: number): number {
      return this.carrito[productoId] || 0
    },

    obtenerCarrito() {
      return this.carrito
    },

    limpiarCarrito() {
      this.carrito = {}
    }
  }
})
