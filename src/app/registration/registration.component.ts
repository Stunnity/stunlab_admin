import { Component, OnInit } from "@angular/core";
import { DataService } from "app/services/app-data/data.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { scorePassword, setPassword } from "../utils/validators";
import { HttpErrorResponse } from "@angular/common/http";
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  formGroup: any;
  registerErrorOccurred: any;
  constructor(private dataService: DataService, private _router: Router) {
    this.formGroup = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(16),
      ]),

      provider_providerName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl("", [
        Validators.required,
        this.passwordValidation,
      ]),
      c_password: new FormControl("", [Validators.required]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(200),
      ]),
    });
  }

  isLoading: boolean;
  btn_text: string;

  ngOnInit() {
    this.btn_text = "create account";
  }
  signUp() {
    this.isLoading = true;
    this.btn_text = "Creating Account";
    this.dataService.signUp(this.formGroup.value).subscribe(
      (res) => {
        this._router.navigate(["/login"]);
      },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.btn_text = "Create Account";
        this.registerErrorOccurred = true;
      }
    );
  }

  passwordValidation(control: FormControl) {
    const password = control.value;
    const score = scorePassword(password);
    setPassword(password);
    if (score < 50) {
      return {
        state: {
          invalid: false,
        },
      };
    }
    return null;
  }
  getEmailErrorMessage() {
    return this.formGroup.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }
}
