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



  crearLista(titulo: string){

    const newList = new Lista( titulo );
    this.listas.push( newList );
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