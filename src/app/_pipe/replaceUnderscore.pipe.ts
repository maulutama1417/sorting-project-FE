import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'replaceUnderscore'
})
export class ReplaceUnderscorePipe implements PipeTransform {
  transform(value: string): string {
    if (value != '' || value != null || value != undefined) {
      return value.replace(/_/g, ' ')
    } else {
      return ''
    }
  }
}