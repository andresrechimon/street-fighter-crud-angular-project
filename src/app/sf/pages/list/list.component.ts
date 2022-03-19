import { Component, OnInit } from '@angular/core';
import { Sf } from '../../interfaces/sf.interface';
import { SfService } from '../../services/sf.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  sf: Sf[] = [];

  constructor(private sfService:SfService) { }

  ngOnInit(): void {
    this.sfService.getSf()
        .subscribe(sf => this.sf = sf);
  }

}
