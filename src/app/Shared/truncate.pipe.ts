import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | undefined, maxWords: number = 10): any {
    if (!value) return value;
    const words = value.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '....';
    } else {
      return value;
    }
  }
}
