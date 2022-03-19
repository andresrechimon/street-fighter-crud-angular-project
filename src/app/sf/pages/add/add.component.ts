import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { Sf } from '../../interfaces/sf.interface';
import { SfService } from '../../services/sf.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  sfChar:Sf = {
    character: '',
    first_appearance: '',
    nationality: '',
    backstory: '',
    alt_image: ''
  }

  constructor(private sfService:SfService, 
              private activatedRoute:ActivatedRoute, 
              private router:Router,
              private snackBar:MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')){
      return;
    }
    this.activatedRoute.params
                .pipe(
                  switchMap(({id}) => this.sfService.getSfById(id))
                )
                .subscribe(sf => this.sfChar = sf)
  }
  
  save(){
    if(this.sfChar.character.trim().length === 0){
      return;
    }else if(this.sfChar.nationality.trim().length === 0){
      return;
    }else if(this.sfChar.first_appearance.trim().length === 0){
      return;
    }else if(this.sfChar.alt_image!.trim().length === 0){
      return;
    }else if(this.sfChar.backstory.trim().length === 0){
      return;
    }

    if(this.sfChar.id){
      //Update
      this.sfService.updateSf(this.sfChar)
          .subscribe(resp => this.showSnackbar('¡PJ editado correctamente!'))
    }else{
      //Add
      this.sfService.addSf(this.sfChar)
        .subscribe(sfChar => {
          this.router.navigate(['./sf/edit', sfChar.id]);    
          this.showSnackbar('¡PJ añadido correctamente!')
        })
    }
  }

  delete(){
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250',
      data: this.sfChar
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.sfService.deleteSf(this.sfChar.id!)
                    .subscribe(resp => {
                      this.router.navigate(['./sf'])
                    })
        }
      }
    )

    
  }

  showSnackbar(msg:string){
    this.snackBar.open(msg, 'Cerrar', {
      duration: 2500
    });
  }
}
