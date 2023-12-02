import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text',
  standalone: true,
})
export class TextPipe implements PipeTransform {
  transform(value: string, size: number = 20, ...args: unknown[]): string {
    if (value.length > size) return `${value.slice(0, size)}...`;
    return value;
  }
}
