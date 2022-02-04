import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @ViewChild('header', { static: true }) header!: ElementRef
  @ViewChild('button', { static: true }) button!: ElementRef
  empId = this._router.snapshot.params['id'];//getting id of url
  submitted = false;

  constructor(private fb: FormBuilder, private http: HttpService, private _router: ActivatedRoute,private route : Router ) {

  }

  employeeForm !: FormGroup


  ngOnInit(): void {
    if (this.empId) {
      this.afterLoadEdit()
    }

    this.createEmployeeForm()



  }

  createEmployeeForm() {
    this.employeeForm = this.fb.group({
      id: [],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      age: ['',Validators.required],
      department: ['', Validators.required],
      gender: ['', Validators.required]
    })
  }

  afterLoadEdit() {
    this.header.nativeElement.textContent = "Edit"
    this.button.nativeElement.textContent = "Update"
    this.http.get(`/employeeDetails/${this.empId}`).subscribe({
      next:(result:any) =>{
          console.log(result)
          this.employeeForm.patchValue({
            id: result.id,
            fname: result.fname,
            lname: result.lname,
            age: result.age,
            department: result.department,
            gender: result.gender
          })
      },
      error:(error:any) => {
        console.log(error)
      }
    })
  }

  onSubmit() {
    this.submitted = true
  if(this.employeeForm.invalid){
    return
  }

  if(!this.empId)
  {
    this.http.post("/employeeDetails", this.employeeForm.value).subscribe({
      next: (result: any) => {
        console.log("Added Successfully")
        this.route.navigate(["/home"])
      },
      error: (error: any) => {
        console.log(error)
      }
    })
    console.log(this.employeeForm.value)
  }
  else{
    this.http.put(`/employeeDetails/${this.empId}`,this.employeeForm.value).subscribe({
      next:(result : any) => {
        console.log("Updated Sucsessfully")
        this.route.navigate(["/home"])
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }
  }


}
