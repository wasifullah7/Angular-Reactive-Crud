import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from '../employee-model';
import { ApiService } from '../Service/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: EmployeeModel[];
  showAdd!: boolean;
  showUpdate!: boolean;
  modalTitle: string = 'Add Employee';
  editedRow!: EmployeeModel;


  @ViewChild('exampleModalRef') exampleModalRef!: ElementRef;

  constructor(private formbuilder: FormBuilder, private api: ApiService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      salary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
    this.getAllEmployee();
  }

  postEmployeeDetails() {
    this.employeeModelObj = this.formValue.value as EmployeeModel;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Employee Added Successfully");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
        err => {
          console.log(err);
          alert("Something went wrong");
        }
      );
  }

  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      });
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert("Employee is deleted");
        this.getAllEmployee();
      });
  }

  buttonShow(inVal: boolean) {
    this.showAdd = inVal;
    this.showUpdate = !inVal;
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.buttonShow(true);
    this.modalTitle = 'Add Employee';
  }

  onEdit(row: EmployeeModel) {
    this.buttonShow(false);
    this.editedRow = row; 
    this.employeeModelObj.id = row.id;
    this.formValue.setValue(row);
    this.modalTitle = 'Edit Employee';
  }

 
updateEmployeeDetails() {
  if (!this.editedRow) {
    return;
  }
  this.employeeModelObj = this.formValue.value;
  this.employeeModelObj.id = this.editedRow.id;

  this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(
      (res) => {
        alert("Update Successfully");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      (error) => {
        console.log(error);
        alert("Something went wrong during the update.");
      }
    );
  
}
}
