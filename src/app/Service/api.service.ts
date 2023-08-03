import { Injectable } from '@angular/core';
import{HttpClient, } from '@angular/common/http'
import { map } from 'rxjs';
import { EmployeeModel } from '../employee-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postEmployee(data:EmployeeModel){
    return this.http.post<EmployeeModel>("http://localhost:3000/posts", data)
    .pipe(map((res:EmployeeModel)=>{
      return res;
    }))
  }
  getEmployee (){
    return this.http.get<EmployeeModel[]>("http://localhost:3000/posts")
    .pipe(map((res:EmployeeModel[])=>{
      return res;
    }))
  }
 updateEmployee(data:EmployeeModel, id:number){
  return this.http.put<EmployeeModel>("http://localhost:3000/posts/"+id, data)
  .pipe(map((res)=>{
    return res;
  }))
 }
 deleteEmployee(id:number){
  return this.http.delete<EmployeeModel>("http://localhost:3000/posts/"+id)
  .pipe(map((res)=>{
    return res;
  }))
 }

}

