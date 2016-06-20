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
        return this.Sortable? this.SortDirection===xTableSortingDirection.Descending? 'desc':'asc':undefined;    
    }
     set sort(value){
         if(value==='desc'){
            this.SortDirection=xTableSortingDirection.Descending;
         }else{
             this.SortDirection=xTableSortingDirection.Ascending;
         }
    }
}