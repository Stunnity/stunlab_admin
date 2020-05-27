import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { SharedDataService } from "../services/shared-data/shared-data.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  formGroup: FormGroup;
  userData: any;
  isLoading: boolean;
  btn_text: string = "Update Profile";
  constructor(
    private dataService: DataService,
    private sharedData: SharedDataService
  ) {
    this.formGroup = new FormGroup({
      email: new FormControl({ value: "", disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl({ value: "", disabled: true }, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(16),
      ]),

      provider_providerName: new FormControl({ value: "", disabled: true }, [
        Validators.required,
        Validators.minLength(3),
      ]),
      username: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.minLength(200),
      ]),
    });
  }

  ngOnInit() {
    this.getUser();
  }
  getUser() {
    setTimeout(() => {
      const user: any = this.sharedData.getLoggedUser();
      this.formGroup.controls.email.setValue(user.email);
      this.formGroup.controls.phone.setValue(user.phone);
      this.formGroup.controls.description.setValue(user.description);
      this.formGroup.controls.username.setValue(user.username);
      this.formGroup.controls.provider_providerName.setValue(
        user.provider_providerName
      )
    }, 13000)
      ;
  }
  getEmailErrorMessage() {
    return this.formGroup.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }
  updateProfile() {
    this.isLoading = true;
    this.dataService.updateAdmin(this.formGroup.value, this.formGroup.controls.username.value).subscribe(
      (res) => {
        this.btn_text = "Updating Profile";
        this.isLoading = false;
      },
      (err) => {
        this.btn_text = "Updating Profile";
        this.isLoading = false;
      }
    );
  }
}
