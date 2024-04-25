import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/ui/service/auth-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'  
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthServiceService) {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
