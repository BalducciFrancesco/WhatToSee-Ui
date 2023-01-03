import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, mergeMap, Observable, switchMap } from 'rxjs';
import { City } from 'src/app/dtos/tour';
import { CityService } from 'src/app/services/city.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  hidePass = [true, true];

  turistRegister = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  guideRegister = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    organizationName: ['', Validators.required],
    favouriteCityId: [-1, Validators.required],
  });

  cityOptions$!: Observable<City[]>

  constructor(private fb: FormBuilder, private userService: UserService, private cityService: CityService) { }

  ngOnInit(): void {
    this.cityOptions$ = this.cityService.getAll()
  }

  submitTurist() {
    if (this.turistRegister.valid) {
      this.userService.registerTourist(this.turistRegister.getRawValue()).subscribe(success => {
        console.log(success);
      })
    }
  }

  submitGuide() {
    if (this.guideRegister.valid) {
      this.userService.registerGuide(this.guideRegister.getRawValue()).subscribe(success => {
        console.log(success);
      })
    }
  }

}
