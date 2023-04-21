import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, shareReplay } from 'rxjs/operators';
import { UserRole } from './dtos/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLogged: boolean = false;
  
  name: string | null = null;
  showTouristMenu: boolean = false;
  showGuideMenu: boolean = false;
  showAdministratorMenu: boolean = false;

  routeTitle: string = "WhatToSeeApp";

  @ViewChild('drawer') drawer!: MatDrawer;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private router: Router, 
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // update toolbar title on each routing event
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.rootRoute(this.activatedRoute)),
      filter((route: ActivatedRoute) => route.outlet === 'primary'),
      mergeMap((route: ActivatedRoute) => route.data)
    ).subscribe((routeData: any) => {
      this.routeTitle = routeData.title ?? "WhatToSeeApp"
      this.isLogged = this.userService.getSession() !== null;
      this.name = this.userService.getSession()?.firstName ?? null;
      this.showTouristMenu = this.isLogged && this.userService.getSession()?.role === UserRole.TOURIST;
      this.showGuideMenu = this.isLogged && this.userService.getSession()?.role === UserRole.GUIDE;
      this.showAdministratorMenu = this.isLogged && this.userService.getSession()?.role === UserRole.ADMINISTRATOR;
    });
  }

  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

}
