import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
//import {BrowserAnimationsModule} from '@angular/platform browser/animations';

//import { MatDialog } from "@angular/material";
//import {MaterialModule} from '@angular/material';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  username: string;

  password: string;

  ngOnInit() {}

  login(): void {
    if (this.username == "admin" && this.password == "admin") {
      this.router.navigate(["registration"]);
    } else {
      alert("Invalid credentials");
    }
  }
}
