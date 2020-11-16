import { Component, OnInit, Input } from "@angular/core";
import { StudentService } from "../student.service";
import { Router, ParamMap, ActivatedRoute } from "@angular/router";
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';

//import { MatSnackBar } from '@angular/material';
import { MatDialogModule } from "@angular/material/dialog";
// https://stackoverflow.com/questions/58594311/angular-material-index-d-ts-is-not-a-module

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  private mode = "update";
  private response = "";
  private title = "New Applicant Registration Form:";
  private id: string;
  durationInSeconds = 5;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(
        "onngOnInit: " +
          paramMap.get("_id") +
          " firstName: " +
          paramMap.get("_firstName") +
          " education: " +
          paramMap.get("_education")
      );
      if (paramMap.has("_id")) {
        this.title = "Update Applicant Profile";
        this.mode = "Update";
        this.id = paramMap.get("_id");
        this.firstName = paramMap.get("_firstName");
        this.lastName = paramMap.get("_lastName");
        this.email = paramMap.get("_email");
        this.phoneNumber = paramMap.get("_phoneNumber");
        this.specialization = paramMap.get("_specialization");
        this.education = paramMap.get("_education");
        this.interest = paramMap.get("_interest");
        this.selfIntro = paramMap.get("_selfIntro");
      } else {
        this.title = "New Applicant Registration Form:";
        this.mode = "Submit";
        this.id = null;
      }
    });
  }

  minCharacterLength: number = 2;
  firstNameHint: string = "Enter first name";
  lastNameHint: string = "Enter last name";
  emailHint: string = "Enter your email";
  phoneNumberHint: string = "Enter your phone number";
  specializationHint: string =
    "Enter your specialization (should be comma seperated)";
  highestEducationLevelHint: string = "Enter your highest education level";
  interestHint: string = "Enter your interest field";
  introHint: string = "Tell us about yourself";

  @Input() firstName: string = "";
  @Input() lastName: string = "";
  @Input() email: string = "";
  @Input() phoneNumber: string = "";
  @Input() specialization: string = "";
  @Input() education: string = "";
  @Input() interest: string = "";
  @Input() selfIntro: string = "";
  
  logName(x) {
    console.log("Value you entered: " + x);
  }

  logComment(x) {
    this.logName(x);
  }
  isEmpty(str) {
    return !str || 0 === str.length;
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarMessageComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  onClick() {
    if (
      this.isEmpty(this.firstName) ||
      this.isEmpty(this.email) ||
      this.isEmpty(this.phoneNumber) ||
      this.isEmpty(this.interest) 
    ) {
      //alert("Error: Please check your inputs! Thanks.");
      this.openSnackBar();
    } else {
      if (this.mode == "Submit") {
        this.studentService
          .addStudent(
            this.firstName,
            this.lastName,
            this.email,
            this.phoneNumber,
            this.specialization,
            this.education,
            this.interest,
            this.selfIntro
          )
          .subscribe(responseData => {
            this.response = responseData.toString();
            console.log(responseData);
            if (this.response.search("ValidationError") == -1) {
              console.log("String did not match.");
              this.router.navigate(["/students"]);
            } else {
              alert("Error: Please check your inputs! Thanks.");
              console.log("String matched.");
            }
          });
        console.log(
          "You entered below info > " +
            "\nFirst Name: " +
            this.firstName +
            "\nLast Name: " +
            this.lastName +
            "\nEmail: " +
            this.email +
            "\nPhone: " +
            this.phoneNumber +
            "\nSpecialization: " +
            this.specialization +
            "\nEducation: " +
            this.education +
            "\nInterested Field: " +
            this.interest +
            "\nIntro: " +
            this.selfIntro
        );
      } else {
        this.studentService
          .updateStudent(
            this.id,
            this.firstName,
            this.lastName,
            this.email,
            this.phoneNumber,
            this.specialization,
            this.education,
            this.interest,
            this.selfIntro
          )
          .subscribe(responseData => {
            this.response = responseData.toString();

            if (this.response.search("ValidationError") == -1) {
              console.log("String did not match.");
              this.router.navigate(["/students"]);
            } else {
              alert("Error: Please check your inputs! Thanks.");
              console.log("String matched.");
            }
            console.log(responseData);
          });
      }
    }
  }
}
