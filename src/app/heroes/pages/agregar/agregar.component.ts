import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap  } from "rxjs/operators";

import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 10px
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe : Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.MarvelComics,
    alt_img: ''
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0)
    {
      return;
    }
    
    if (this.heroe.id){
      //actualizar
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe( heroe => this.mostrarSnckBar('Registro Actualizado'))
    } else {
      //crear
      this.heroesService.agregarHeroe( this.heroe )
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnckBar('Registro creado');
        });
    
    }
    
  }

  borrarHeroe() {
  const dialog = this.dialog.open( ConfirmarComponent ,{
  width: '250px',
  data: this.heroe
})

  dialog.afterClosed().subscribe(
    (result) => {

      if (result){
        this.heroesService.borrarHeroe(this.heroe.id!)
          .subscribe( heroe => console.log('Borrado', this.heroe.id))
        this.router.navigate(['/heroes'])
      }
      
    }
  )
  
  
  }

  mostrarSnckBar( mensaje: string) {
    this.scackBar.open( mensaje, 'Ok!', {
      duration: 2500
    });

  }
  constructor( 
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private scackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')){
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHeroePorId(id))
    )
      .subscribe( heroe => this.heroe = heroe)

  }

}
