import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-hero-tarjeta',
  templateUrl: './hero-tarjeta.component.html',
  styles: [`
  mat-card {
    margin-top: 10px;
    margin-bottom: 10px
  }
    img {
      border-radius: 10px
    }
  `
  ]
})
export class HeroTarjetaComponent {

  @Input() heroe!: Heroe;
  @Input() verBotones: boolean = true;


}
