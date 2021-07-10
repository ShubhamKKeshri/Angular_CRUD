import { Component, OnInit } from '@angular/core';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  collection:any=[];
  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'gender', 'designation', 'phone', 'action'];
  
  constructor( private empService:EmpService) { }

  ngOnInit(): void {
    this.empService.getList().subscribe((result)=>{
      console.log(result)
      this.collection=result;
    });
  }

  deleteEmp(element: number){
    this.collection.splice(element-1, 1)
    this.empService.deleteEmp(element).subscribe((result)=>{
      console.log(result)
    })
  }
}
