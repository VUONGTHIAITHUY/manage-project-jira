import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstCharacterPipe'
})
export class FirstCharacterPipePipe implements PipeTransform {

  transform(nameMember: string): unknown {
    nameMember = nameMember;
    return nameMember.match(/\b(\w)/g)?.join('').substring(0, 2);
  }

}
