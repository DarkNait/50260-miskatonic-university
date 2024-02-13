import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  calculateAge = (date: Date) : number => {    
    //calculate month difference from current date in time  
    const month_diff = Date.now() - date.getTime();  
      
    //convert the calculated difference in date format  
    const age_dt = new Date(month_diff);   
      
    //extract year from date      
    const year = age_dt.getUTCFullYear();  
      
    //now calculate the age of the user  
    const age = Math.abs(year - 1970);  
      
    //return the calculated age  
    return age;
  }


  transform(value: Date, ...args: unknown[]): unknown {

    if(value){
      if(! (value instanceof Date))
        value = new Date(value);
      
      return this.calculateAge(value);
    }

    return null;
  }

}
