import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/tasks/task2/interfaces/IUser';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  constructor(private userService: UserService , private router : Router) { }
  users: IUser[] = []
  user: IUser = {
    id: 0,
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    }
  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res
      console.log(res)
    })
  }
}
