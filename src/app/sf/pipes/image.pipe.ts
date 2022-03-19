import { Pipe, PipeTransform } from '@angular/core';
import { Sf } from '../interfaces/sf.interface';

@Pipe({
  name: 'image',
  pure: false
})
export class ImagePipe implements PipeTransform {

  transform(sfChar: Sf):string{
    if(!sfChar.id && !sfChar.alt_image){
      return 'assets/no-image.png';
    }else if(sfChar.alt_image){
      return sfChar.alt_image;
    }else{
      return `assets/heroes/${sfChar.id}.png`;
    }
  }

}
