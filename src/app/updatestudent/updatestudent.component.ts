import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from "../student.service";

@Component({
  selector: 'app-updatestudent',
  templateUrl: './updatestudent.component.html',
  styleUrls: ['./updatestudent.component.css']
})
export class UpdatestudentComponent implements OnInit {

  ngOnInit() {}
  
  constructor(private studentService: StudentService) {}

  minCharacterLength: number = 2;
  firstNameHint: string = "Enter first name";
  lastNameHint: string = "Enter last name";
  emailHint: string = "Enter your email";
  phoneNumberHint: string = "Enter your phone number";
  specializationHint: string =
    "Enter your specialization (should be comma seperated)";
  highestEducationLevelHint: string = "Enter your highest education level";
  interestHint: string = "Enter your interested Field";
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

  onUpdateClick() {
    
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

  }
}
