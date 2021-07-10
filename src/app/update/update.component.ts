import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpService } from '../emp.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  alert:boolean=false;

  constructor(private fb: FormBuilder, private emp:EmpService, private activatedRouter:ActivatedRoute) { }

  updateForm = this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    address:['',[Validators.required,Validators.minLength(5)]],
    phone:['',[Validators.required,,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]],
    designation:['',Validators.required],
    gender:['', Validators.required]
  })

  ngOnInit(): void {
    console.log(this.activatedRouter.snapshot.params.id);
    this.emp.getCurrentEmp(this.activatedRouter.snapshot.params.id).subscribe((result)=>{
      this.updateForm = this.fb.group({
        name:['',[Validators.required]],
        email:['',[Validators.required, Validators.email]],
        address:['',[Validators.required,Validators.minLength(5)]],
        phone:['',[Validators.required,,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]],
        designation:['',Validators.required],
        gender:['', Validators.required]
      })
    })
  }

  collection(){
    // console.warn(this.updateForm.value);
    this.emp.updateEmp(this.activatedRouter.snapshot.params.id, this.updateForm.value).subscribe((result)=>{
      // console.log(result)
      this.alert=true;
    })
  }

  closeAlert(){
    this.alert=false;
  }
}
