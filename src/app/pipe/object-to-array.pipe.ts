import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArrayPipe'
})
export class ObjectToArray implements PipeTransform {

  transform(objects : any = []) {
    return Object.values(objects);
  }

}
