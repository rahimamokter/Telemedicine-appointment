import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
// we know that http response will be in JSON format.

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class StudentService {
  private geturl = "http://localhost:8000/students";
  constructor(private http: HttpClient) {}

  // Uses http.get() to load data.
  getStudents() {
    return this.http.get(this.geturl);
  }

  addStudent( firstName: string, lastName: string, email: string, phoneNumber: string, specialization: string, education: string, interest: string, selfIntro: string) {
   return this.http
      .post(this.geturl, { firstName, lastName, email, phoneNumber, specialization, education, interest, selfIntro });
  }

  updateStudent(id: string, firstName: string, lastName: string, email: string, phoneNumber: string, specialization: string, education: string, interest: string, selfIntro: string) {
    return this.http
      .put(this.geturl + "/" + id, { firstName, lastName, email, phoneNumber, specialization, education, interest, selfIntro })
  }

  deleteStudent(studentId: string) {
   return this.http.delete(this.geturl + "/" + studentId);
    //location.reload();
  }
}
