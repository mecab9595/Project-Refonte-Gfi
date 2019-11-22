import { ViewChild, Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import 'rxjs/add/observable/of';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DoubleRowPaginatorComponent } from '../double-row-paginator/double-row-paginator.component'; 

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent {
  displayedColumns = ['symbole','position', 'name', 'weight'];
  dataSource: MatTableDataSource<any>;
  elementData: Element[];  
  tempElementData: any;
  isExpansionDetailRow = (i: number, row: Object) => {
    //console.log(row);
    return row.hasOwnProperty('detailRow');
  } 
  expandedElement: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(DoubleRowPaginatorComponent) customPaginator: DoubleRowPaginatorComponent;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.getRows());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.customPaginator;
    this.dataSource.sortingDataAccessor = (item, property) => {

      let newItem;
      if (item.element !== undefined)
        newItem = item.element;
      else
        newItem = item; 

      console.log(this.tempElementData); 
      let foundElement;
      
      if (item.element !== undefined)
        foundElement = this.tempElementData.find(i => i.element !== undefined && item.element.name === i.element.name);
      else 
        foundElement = this.tempElementData.find(i => item.name === i.name);

      let index = this.tempElementData.indexOf(foundElement);
      console.log("foundElement: " + JSON.stringify(item) + " " + +index);
      return +index;
    }
  }

  sortFilteredData(property) {
    let unsortedData = this.dataSource.filteredData.map(g => Object.assign({}, g));

    if (property === "name") {
      unsortedData.sort(this.nameComparer);
    }

    //console.log(unsortedData);

    let sortedData = new Array();

    for (var i = 0, j = 0; i < unsortedData.length; i++) {
      if (unsortedData[i].element === undefined) {
        sortedData[j] = unsortedData[i];
        j += 2;
      }
    } 

    console.log(sortedData);


    unsortedData = unsortedData.filter(course => course.element !== undefined);

    for (var i = 0; i < sortedData.length; i += 2) {
      let name = unsortedData.find(course => course.element.name ===
        sortedData[i].name);
      sortedData[i + 1] = name;
    }

   console.log(sortedData);

    this.tempElementData = sortedData;
  }

  nameComparer(nameA, nameB) {
    if (nameA.element !== undefined)
      nameA = nameA.element;

    if (nameB.element !== undefined)
      nameB = nameB.element;

    nameA = nameA.name;
    nameB = nameB.name;

    if (nameA === nameB)
      return 0;

    if (nameA < nameB)
      return -1;

    return 1;
  }

  getRows() { 
    const rows = [];
    data.forEach(element => rows.push(element, { detailRow: true,      element }));
    //console.log(rows);
    return rows;
  }

  toggleRow(value: Element) {
    const foundElement = this.dataSource.data.find(elem => elem.element !== undefined && elem.element.name === value.name)    
    //console.log("The found element is " + JSON.stringify(foundElement));
    const index = this.dataSource.data.indexOf(foundElement);
    this.dataSource.data[index].element.show = !this.dataSource.data[index].element.show;
  }

}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  show: boolean;
}

const data: Element[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', show: false },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', show: false },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', show: false },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', show: false },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', show: false },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', show: false },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', show: false },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', show: false },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', show: false },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', show: false },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', show: false },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', show: false },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', show: false },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', show: false },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', show: false },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', show: false },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', show: false },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', show: false },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', show: false },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', show: false },
];

