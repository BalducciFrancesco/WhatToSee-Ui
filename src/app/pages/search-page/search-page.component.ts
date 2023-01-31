import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { City, TagDTO, Tour } from 'src/app/dtos/tour';
import { CityService } from 'src/app/services/city.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  searchForm = new FormGroup({
    cityId: new FormControl<number>(-1, { nonNullable: true }),
    approxDuration: new FormControl<string>('', { nonNullable: true }),
    tagsIds: new FormControl<number[]>([], { nonNullable: true }),
    themeId: new FormControl<number>(-1, { nonNullable: true }),
  })

  cityOptions$!: Observable<City[]>
  themeOptions$!: Observable<City[]>
  tagsOptions$!: Observable<City[]>

  searchResults$?: Observable<Tour[]>

  constructor(
    private cityService: CityService, 
    private tourService: TourService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cityOptions$ = this.cityService.getAll()
    this.themeOptions$ = this.tourService.getAllThemes()
    this.tagsOptions$ = this.tourService.getAllTags()
  }

  submitSearch(): void {
    if(this.searchForm.valid) {
      this.searchResults$ = this.tourService.search(this.searchForm.getRawValue())
    }
  }
  
}
