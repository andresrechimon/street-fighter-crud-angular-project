import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Sf } from '../../interfaces/sf.interface';
import { SfService } from '../../services/sf.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  term:string = '';
  sfChar:Sf[] = [];
  sfSelected:Sf | undefined;
  constructor(private sfServices:SfService) { }

  ngOnInit(): void {
  }

  searching(){
    this.sfServices.getSugerences(this.term.trim())
        .subscribe(sfChar => this.sfChar = sfChar)
  }

  selectedOption(event:MatAutocompleteSelectedEvent){
    if(!event.option.value){
      this.sfSelected = undefined;
      return ;
    }

    const sf:Sf = event.option.value;
    this.term = sf.character;
    this.sfServices.getSfById(sf.id!)
        .subscribe(sf => this.sfSelected = sf)
  }
}
