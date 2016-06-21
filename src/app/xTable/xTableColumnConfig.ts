import {xTableSortingDirection} from './xTableSortingDirection'
export /**
 * class to configure one column for xTable component
 */
class xTableColumnConfig {
    constructor(
       public Title: string,
       public Name: string,
       public Filterable:boolean = false,
       public Sortable: boolean = true,       
       public SortDirection:xTableSortingDirection = null        
    ) {
        
    }
    get name():string{
        return this.Name;    
    }
    get title():string{
        return this.Name;    
    }
    get sort():string{
        if(this.SortDirection===null){
            return '';
        }
        return this.SortDirection===xTableSortingDirection.Descending? 'desc':'asc';    
    }
     set sort(value){
          
         if(value==='desc'){
            this.SortDirection=xTableSortingDirection.Descending;
         }else if(value==='asc'){
             this.SortDirection=xTableSortingDirection.Ascending;
         }else{
             this.SortDirection = null;
         }
    }
}