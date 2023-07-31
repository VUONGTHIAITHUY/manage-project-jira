import { Pipe, PipeTransform } from '@angular/core';
import { Member } from '../project/models/project.model';

@Pipe({
  name: 'firstCharacter'
})
export class FirstCharacterPipe implements PipeTransform {

  transform(nameMember: string): unknown {
    nameMember = nameMember;
    return nameMember.match(/\b(\w)/g)?.join('').substring(0, 2);
  }

}
