import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderPipe'
})
export class GenderPipePipe implements PipeTransform {

  transform(value: string, gender: string): string {
    if(gender=='Male'){
      return "Mr. " +value;
    }
    else if(gender=='Female'){
      return "Miss. "+value;
    }
    else{
      return value;
    }
  }
}
