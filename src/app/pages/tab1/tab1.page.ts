import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public deseoSvc: DeseosService, 
    private router: Router,
    public alertController: AlertController
  ) { }


  
  async agregarLista(){

    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',
      inputs: [
        {
          name:         'titulo',
          type:         'text',
          placeholder:  'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.info('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data: any) => {
            console.info(data);
            if( data.titulo.length < 2 ){ return }

            //crear la lista
            const listaId = this.deseoSvc.crearLista(data.titulo);

            this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
          }
        }
      ]
    });

    alert.present();
  }

  listaSeleccionada(lista: Lista){
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  }
}
