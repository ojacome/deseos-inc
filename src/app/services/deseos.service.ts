import { Injectable } from '@angular/core';
import { ListaItem } from '../models/lista-item.model';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];



  constructor() { 

    const lista1 = new Lista('Recoletar piedras del infinito');
    const lista2 = new Lista('Heroes a desaparecer');

    this.listas.push(lista1, lista2);

  }

}
