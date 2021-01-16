import { Injectable } from '@angular/core';
import { ListaItem } from '../models/lista-item.model';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];



  constructor() { 

    this.cargarStorage();
  }



  crearLista(titulo: string): number{

    const newList = new Lista( titulo );
    this.listas.push( newList );
    this.guardarStorage();

    return newList.id;
  }

  obtenerLista( id: string | number ) : Lista {

    id = Number(id);
    return this.listas.find( lista => lista.id === id );
  }

  borrarLista( lista : Lista){
    this.listas = this.listas.filter( listaData => listaData.id !== lista.id);
    this.guardarStorage();
  }

  editarLista( lista: Lista ){
    this.listas.find( listaData => {
      if(listaData.id === lista.id){
        listaData = lista;
      }
    });
  
    this.guardarStorage();
  }

  guardarStorage() {

    localStorage.setItem('data', JSON.stringify( this.listas ) );
  }

  cargarStorage() {

    if( localStorage.getItem('data') ){
      this.listas = JSON.parse( localStorage.getItem('data') );
    }
    else{
      this.listas = [];
    }
  }
}