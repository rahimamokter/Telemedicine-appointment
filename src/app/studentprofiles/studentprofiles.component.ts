import { Component, OnInit } from "@angular/core";
import { StudentService } from "../student.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-studentprofiles",
  templateUrl: "./studentprofiles.component.html",
  styleUrls: ["./studentprofiles.component.css"]
})
export class StudentprofilesComponent implements OnInit {
  title = "IT6203- Individual project";
  cardNumberInputHint: string = "Enter card number here";
  viewModel = "Home";
  public students;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe(
      data => {
        this.students = data;
        console.log(JSON.stringify(this.students));
      },
      err => console.error(err),
      () => console.log("Finished loading")
    );
  }

  onDelete(id: string) {
    console.log("onDelete item triggered. id: " + id);
    this.studentService.deleteStudent(id).subscribe(() => {
      console.log("Deleted msg from profile.ts file : " + id);
      setTimeout(function() {
        location.reload();
      }, 2000);
    });
  }

  onUpdate(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    specialization: string,
    education: string,
    interest: string,
    selfIntro: string
  ) {
    this.router.navigate([
      "/editStudent",
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      specialization,
      education,
      interest,
      selfIntro
    ]);
    console.log("Go for update student information. id: " + id);
  }
}
