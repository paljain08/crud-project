import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  p: number = 1;
  fetchEmployeeData : any = [];
  term = ""
  

  constructor(private http : HttpService,private route : Router) { }

  ngOnInit(): void {
    this.getEmployeeDetails()
  }

  getEmployeeDetails()
  {
    this.http.get("/employeeDetails").subscribe({
      next : (result:any) => {
        
        this.fetchEmployeeData = result
        console.log(this.fetchEmployeeData)
      },
      error : (error:any) =>{
        console.log(error)
      }
    })
  }

  onDelete(id : any)
  {
    this.http.delete(`/employeeDetails/${id}`).subscribe({
      next : (result:any) => {
        
       
        console.log("Successfully Deleted")
        this.getEmployeeDetails()
      },
      error : (error:any) =>{
        console.log(error)
      }
    })
    //console.log(id)
  }

  onEdit(id : any)
  {
    this.route.navigate([`/edit/${id}`])
  }
  key = 'id';
  reverse:boolean = false;
  sort(key:any){
    this.reverse = !this.reverse
  }
}
