import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, mergeMap, shareReplay } from 'rxjs/operators';
import { UserRole } from './dtos/user';
import { UserService } from './services/user.service';

/**
 * Main component of the application. It contains the toolbar and the drawer.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * True if the user is logged in, false otherwise.
   */
  isLogged: boolean = false;
  
  /**
   * The name of the logged user, null if not logged in.
   */
  name: string | null = null;

  /**
   * The role of the logged user, null if not logged in.
   */
  role: UserRole | null = null;

  /**
   * The user roles enum.
   */
  UserRole = UserRole;

  /**
   * The title of the toolbar. It changes on each routing event.
   */
  routeTitle: string = "WhatToSee";

  /**
   * Reference to the drawer.
   */
  @ViewChild('drawer') drawer!: MatDrawer;

  /**
   * Observable for screen size changes.
   * Allows page to be responsive.
   */
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
    // update toolbar, login status and user name on each routing event
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.rootRoute(this.activatedRoute)),
      filter((route: ActivatedRoute) => route.outlet === 'primary'),
      mergeMap((route: ActivatedRoute) => route.data)
    ).subscribe((routeData: any) => {
      this.routeTitle = routeData.title ?? "WhatToSeeApp"
      this.isLogged = this.userService.getSession() !== null;
      this.name = this.userService.getSession()?.firstName ?? null;
      this.role = this.userService.getSessionRole()
    });
  }

  /**
   * Utility function to get the root route of the current route.
   * @param route the current route
   * @returns the root route
   */
  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  /**
   * When a route is clicked, close the drawer if it is in over mode and remove the focus from the hamburger button.
   */
  onRouteClick() {
    (document.activeElement! as HTMLElement).blur();
    if(this.drawer.mode === 'over') {
      this.drawer.close();
    }
  }

  /**
   * User requested to logout.
   */
  logout() {
    this.userService.logout();
    this.router.navigate(['login']);
  }

}
