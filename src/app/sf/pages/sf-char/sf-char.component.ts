import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Sf } from '../../interfaces/sf.interface';
import { SfService } from '../../services/sf.service';

@Component({
  selector: 'app-sf-char',
  templateUrl: './sf-char.component.html',
  styleUrls: ['./sf-char.component.css']
})
export class SfCharComponent implements OnInit {
  sfChar!:Sf;
  constructor(private activatedRoute:ActivatedRoute, private sfServices:SfService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.sfServices.getSfById(id))
        )
        .subscribe(sfChar => this.sfChar = sfChar)
  }
  
  back(){
    this.router.navigate(['/sf/list'])
  }
}
