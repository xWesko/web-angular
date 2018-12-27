import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];


  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }


  private cargarProductos() {

     return new Promise( ( resolve, reject ) => {

       this.http.get('https://angular-html-25cf9.firebaseio.com/productos_idx.json')
           .subscribe( (resp: Producto[]) => {
             this.productos = resp;
             this.cargando = false;
             resolve();
           });

     });

  }

  getProducto(id: string) {
    return this.http.get(`https://portafolio-80cd1.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {


    if ( this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecutar despues de tener los productos
        // aplicar filtro
        this.filtarProductos( termino );
      });

    } else {
      // aplicar el filtro
      this.filtarProductos( termino );
    }

    this.productosFiltrado = this.productos.filter( producto => {
      return true;
    });
  }

  private filtarProductos( termino: string ) {

      this.productosFiltrado = [];

      termino = termino.toLocaleLowerCase();

      this.productos.forEach( prod => {

        const tituloLower = prod.titulo.toLocaleLowerCase();

        if ( tituloLower.indexOf( termino ) >= 0 ) {

          this.productosFiltrado.push( prod );

        }

      });

  }

}
