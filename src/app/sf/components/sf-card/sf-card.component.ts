import { Component, Input } from '@angular/core';
import { Sf } from '../../interfaces/sf.interface';

@Component({
  selector: 'app-sf-card',
  templateUrl: './sf-card.component.html',
  styleUrls: ['./sf-card.component.css']
})
export class SfCardComponent{
@Input() sfChar!:Sf;
}
