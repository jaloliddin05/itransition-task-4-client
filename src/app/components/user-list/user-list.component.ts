import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any;
  constructor(private readonly userService: UserService) {}
  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (response:any) => {
        console.log(response);
        this.users = response?.items
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
