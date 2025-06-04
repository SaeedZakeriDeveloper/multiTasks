import { IMAGE_CONFIG } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
// import { IUser } from '../../Interfaces/IUser'
import { IUser } from 'src/app/tasks/task2/interfaces/IUser'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: string | null = null;
  user: IUser| undefined;

  constructor(private route: ActivatedRoute, private userService: UserService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadUser(id);
    });


  }
  loadUser(id: number): void {
    this.userService.getUserById(id).subscribe(data => {
      this.user = data;
    });
  }
}