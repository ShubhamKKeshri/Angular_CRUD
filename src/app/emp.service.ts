import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  url="http://localhost:3000/emp";
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
}
