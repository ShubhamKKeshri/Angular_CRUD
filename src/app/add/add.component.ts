import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpService } from '../emp.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  alert:boolean=false;

  constructor(private fb: FormBuilder, private emp:EmpService) { }

  profileForm = this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    address:['',[Validators.required,Validators.minLength(5)]],
    phone:['',[Validators.required,,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]],
    designation:['',Validators.required],
    gender:['', Validators.required]
  })

  ngOnInit(): void {
  }

  saveForm(){
    // console.log(this.profileForm.value);
    this.emp.saveEmp(this.profileForm.value).subscribe((result)=>{
      // console.log(result)
      this.alert=true;
      // this.profileForm.reset({});
    });
    
  }

  closeAlert(){
    this.alert=false;
  }

}
