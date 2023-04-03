import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  private collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });

  transform(value: Array<any>, field: string, order: string, dataType: string = ""): any {
    if(order==='desc') {
      if(dataType==='date')
      {
        console.log('date desc')
        console.log(JSON.stringify([...value].sort((a, b) => new Date(b[field]).valueOf() - new Date(a[field]).valueOf())))
        return [...value].sort((a, b) => new Date(b[field]).valueOf() - new Date(a[field]).valueOf());
      }
      return value.sort((a,b )=>{
        return this.collator.compare(b[field],a[field])
      })
    }
    else {
      if(dataType==='date')
      {
        console.log('date asc')
        console.log(JSON.stringify([...value].sort((a, b) => new Date(a[field]).valueOf() - new Date(b[field]).valueOf())))
        return [...value].sort((a, b) => new Date(a[field]).valueOf() - new Date(b[field]).valueOf());
      }
      return value.sort((a,b )=>{
        return this.collator.compare(a[field],b[field])
      })
    }
  }
}
