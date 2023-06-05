import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  userId: any;
  @Input() users: any;
  @Input() user: any;
  @Input() index: any;
  @Input() checked: any;
  @Output() addToSelect = new EventEmitter<string>();
  @Output() removeFromSelect = new EventEmitter<string>();
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) {
    this.userId = this.cookieService.get('userId');
  }

  deleteUser(id: string) {
    this.userService.deleteOne(id).subscribe({
      next: (response: any) => {
        const index = this.users.findIndex((u: any) => u.id == id);
        this.users.splice(index, 1);
        if (this.userId == id) {
          this.router.navigate(['login']);
        }
      },
      error: (err) => {
        console.log(err);
        if (err.error.statusCode == 400) {
          this.router.navigate(['login']);
        }
      },
    });
  }

  changeUserStatus(id: string, status: boolean) {
    this.userService.changeStatus([id], status).subscribe({
      next: (res: any) => {
        const user = this.users.find((u: any) => u.id == id);
        user.status = status;
        if (this.userId == id && !status) {
          this.router.navigate(['login']);
        }
      },
      error: (err) => {
        console.log(err);
        if (err.error.statusCode == 400) {
          this.router.navigate(['login']);
        }
      },
    });
  }

  addToSelects(id: string) {
    this.addToSelect.emit(id);
  }

  removeFromSelects(id: string) {
    this.removeFromSelect.emit(id);
  }

  dateParser(date: Date) {
    return new Date(date).toLocaleString();
  }
}
