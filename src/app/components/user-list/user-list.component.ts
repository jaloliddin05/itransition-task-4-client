import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any;
  selectedUsers: string[] = [];
  allCheckBox: any;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (response: any) => {
        this.users = response?.items;
      },
      error: (error) => {
        if (error.status) {
          this.router.navigate(['login']);
        }
      },
    });
  }

  selectAll(bool: boolean) {
    if (bool) {
      const userId = localStorage.getItem('userId');
      this.users?.forEach((u: any) => {
        if (userId != u.id) {
          this.selectedUsers.push(u.id);
        }
      });
    } else {
      this.selectedUsers = [];
    }
  }

  addToSelect(id: string) {
    this.selectedUsers.push(id);
  }
  removeFromSelected(id: string) {
    const index = this.selectedUsers.findIndex((s) => s == id);
    this.selectedUsers.splice(index, 1);
  }

  isSelected(id: string) {
    let data = this.selectedUsers.find((u) => u == id);
    return data ? true : false;
  }

  deleteUsers() {
    this.userService.deleteMore(this.selectedUsers).subscribe({
      next: (res: any) => {
        this.users = this.users.filter(
          (u: any) => !this.selectedUsers.includes(u.id)
        );
        const userId = localStorage.getItem('userId');
        if (this.isSelected(userId as string)) {
          this.router.navigate(['login']);
        }
        this.selectedUsers = [];
        this.allCheckBox = false;
      },
      error: (err: any) => {
        console.log(err);
        if (err.error.statusCode == 400) {
          this.router.navigate(['login']);
        }
      },
    });
  }

  changeUsersStatus(status: boolean) {
    this.userService.changeStatus(this.selectedUsers, status).subscribe({
      next: (res: any) => {
        this.selectedUsers.forEach((id) => {
          const user = this.users.find((u: any) => u.id == id);
          if (user) {
            user.status = status;
          }
        });
        this.selectedUsers = [];
        this.allCheckBox = false;
      },
      error: (err: any) => {
        if (err.error.statusCode == 400) {
          this.router.navigate(['login']);
        }
      },
    });
  }

  logout() {
    this.authService.userLogout().subscribe({
      next: (res) => {
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
