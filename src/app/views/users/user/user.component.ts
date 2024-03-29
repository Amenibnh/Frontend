import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({

  selector: 'app-user',
    templateUrl:'./user.component.html',
    styleUrls: ['./user.component.scss']
  })
  
export class UserComponent implements OnInit  {
  users: any;

  constructor(private userService: UserService, private router:Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response.users;
        console.log(this.users);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  deleteUser(id:any) {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        this.users = response.users;
        console.log(this.users);
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  } 
}