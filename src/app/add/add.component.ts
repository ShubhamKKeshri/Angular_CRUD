import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { EmpService } from '../emp.service';
import { IempData } from '../empInterface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  formData: IempData = { name: '', email: '', address: '', phone: null, dob: null, designation: '', gender: '' };

  public id = new FormControl('');
  public name = new FormControl('', [Validators.required, Validators.minLength(4)]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public address = new FormControl('', [Validators.required, Validators.minLength(5)]);
  public phone = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]);
  public dob = new FormControl('', Validators.required);
  public designation = new FormControl('', Validators.required);
  public gender = new FormControl('', Validators.required);

  @ViewChild('profileForm', { static: true }) profileForm: NgForm;

  constructor(private emp: EmpService,
    @Optional() public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IempData) { }

  // update
  ngOnInit(): void {

    if (this.data) {
      console.log(this.data);
    } else {
      this.data = { id: undefined, name: "", email: "", address: "", phone: null, dob: null, designation: "", gender: "" };
    }

    if (this.data) {
      this.name.setValue(this.data.name);
      this.email.setValue(this.data.email);
      this.address.setValue(this.data.address);
      this.phone.setValue(this.data.phone);
      this.dob.setValue(this.data.dob);
      this.designation.setValue(this.data.designation);
      this.gender.setValue(this.data.gender);
      this.id.setValue(this.data.id);
    }
  }

  saveForm() {
    
      let userData = {
        id: this.id.value,
        name: this.name.value,
        email: this.email.value,
        address: this.address.value,
        phone: this.phone.value,
        designation: this.designation.value,
        dob: this.dob.value,
        gender: this.gender.value,
      };
      console.log(userData);

      if (this.name?.errors && this.email?.errors && this.address?.errors && this.phone?.errors && this.designation?.errors && this.dob?.errors && this.gender?.errors) {
        return;
      }
      // else if(userData.id!=undefined || userData.id==undefined){
      //   this.dialogRef.close({name: userData.name, email: userData.email, address: userData.address, 
      //     phone: userData.phone, designation: userData.designation, dob :userData.dob, gender:userData.gender,id: userData.id});
      // }
      else {
        this.dialogRef.close({
          name: userData.name, email: userData.email, address: userData.address,
          phone: userData.phone, designation: userData.designation, dob: userData.dob, gender: userData.gender, id: userData.id
        });
        this.dialogRef.close(userData);
      }

  }

  validate(){
    if(this.name.invalid || this.email.invalid || this.address.invalid || this.phone.invalid || this.designation.invalid || this.dob.invalid || this.gender.invalid){
      return true;
    }
    else{
      return false;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}


