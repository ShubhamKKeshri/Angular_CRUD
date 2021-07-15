import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  url="http://localhost:3000/emp";

  profileForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    address: new FormControl('',[Validators.required,Validators.minLength(5)]),
    phone: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[0-9]*')]),
    dob: new FormControl('',Validators.required),
    designation: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
  })

  constructor(private http:HttpClient) { }

  getList(){
    return this.http.get(this.url);
  }

  saveEmp(data: any){
    return this.http.post(this.url, data)
  }

  deleteEmp(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  getCurrentEmp(id: number){
    return this.http.get(`${this.url}/${id}`);
  }

  updateEmp(id: number,data: any){
    return this.http.put(`${this.url}/${id}`, data);
  }
}
