import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpService } from '../emp.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { IempData } from '../empInterface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  selectedrow: any;

  collection?: IempData[];
  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'gender', 'designation', 'phone', 'dob', 'action'];
  dataSource = new MatTableDataSource<IempData>(this.collection);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private empService: EmpService, public dialog: MatDialog, public dialogRef: MatDialogRef<AddComponent>) { }

  ngOnInit(): void {
    this.getEmp();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getEmp(){
    let employ = this.empService.getList().subscribe(y => this.dataSource.data = y as IempData[])
  }

  deleteEmp(element: number) {
    this.empService.deleteEmp(element).subscribe(x => this.getEmp());
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  highlight(row: any, evt: any) {
    this.selectedrow = row;
  }

  openDialog(row?: any) {
    console.log(row);
    const dialogRef = this.dialog.open(AddComponent, { width: "40%", data: row ? row : undefined });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log("Close Dialog");
      if(result == undefined){
        return ;
      }
      else if (result && (result.id == undefined)) {
        console.log(row)
        this.empService.saveEmp(result).subscribe((res) => {
          this.getEmp();
        });
      }
      else{
        this.empService.updateEmp(result.id, result).subscribe((res) => {
          console.log(res)
          this.getEmp();
        });
      }
    })
  }
}
