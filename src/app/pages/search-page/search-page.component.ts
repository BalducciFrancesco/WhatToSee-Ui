import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/classes/utils';
import { City, Tag, Theme, Tour } from 'src/app/dtos/tour';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  searchForm = new FormGroup({
    city: new FormControl<City | null>(null),
    approxDuration: new FormControl<string | null>(null),
    tags: new FormControl<Tag[] | null>(null),
    theme: new FormControl<Theme | null>(null),
  })

  cityOptions$!: Observable<City[]>
  themeOptions$!: Observable<Theme[]>
  tagsOptions$!: Observable<Tag[]>

  searchResults$?: Observable<Tour[]>

  constructor(
    private tourService: TourService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cityOptions$ = this.tourService.getAllCities()
    this.themeOptions$ = this.tourService.getAllThemes()
    this.tagsOptions$ = this.tourService.getAllTags()
  }

  submitSearch(): void {
    if(this.searchForm.valid) {
      this.searchResults$ = this.tourService.search(Utils.nonEmptyFieldsOf(this.searchForm.value))
    }
  }
  
}
