import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;



  constructor(
    private router: Router,
    public deseoSvc: DeseosService,
    public alertController: AlertController
  ) { }

  ngOnInit() {}



  listaSeleccionada(lista: Lista){

    if( !this.terminada){
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
    else{
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }
  }

  borrar( lista: Lista ){
    this.deseoSvc.borrarLista( lista );
  }


  async editar( lista : Lista ){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar lista',
      inputs: [
        {
          name:         'titulo',
          type:         'text',
          value:        lista.titulo,          
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
          text: 'Actualizar',
          handler: (data: any) => {
            console.info(data);
            if( data.titulo.length < 2 ){ return }

            lista.titulo = data.titulo;
            this.deseoSvc.editarLista(lista);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
          }
        }
      ]
    });

    alert.present();
  }
}
