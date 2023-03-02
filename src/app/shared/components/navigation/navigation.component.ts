import { Component, HostListener, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(private renderer: Renderer2, private formBuilder: FormBuilder) {}
  TOOLBAR_HEIGHT = 64;
  navigationTabs = [
    {
      id: 1,
      name: 'Home',
      icon: 'home',
      link: '/',
    },
    {
      id: 2,
      name: 'Movies',
      icon: 'movie',
      link: '/movies',
    },
    {
      id: 3,
      name: 'TV Series',
      icon: 'tv',
      link: '/tv-series',
    },
    {
      id: 4,
      name: 'Search',
      icon: 'search',
      link: '/search',
    },
  ];
  @HostListener('window:scroll', []) onWindowScroll() {
    // do some stuff here when the window is scrolled
    let scroll = document.scrollingElement.scrollTop;
    this.isActiveScrollbar = scroll > this.TOOLBAR_HEIGHT;
  }
  isActiveScrollbar = false;
  isShowDialog = false;
  isShowSidebar = false;
  isSwitchLoginMode = true;
  currentPosition = window.pageYOffset;
  signInForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  signUpForm = this.formBuilder.group({
    username: ['', Validators.required],
    displayName: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  signUp = 'Sign up';
  signUpSwitchModeText = 'Aldready have an account? Sign In';

  onOpenNavigationSidebar() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.renderer.addClass(document.body, 'hidden-scrollbar');
    this.isShowSidebar = true;
  }

  onOpenAuthDiaglog() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    this.renderer.addClass(document.body, 'hidden-scrollbar');
    this.isShowDialog = true;
  }
  onCloseAuthDialog() {
    this.isShowDialog = false;
    this.renderer.removeClass(document.body, 'hidden-scrollbar');
  }
  onCloseNavigationSidebar() {
    this.isShowSidebar = false;
    this.renderer.removeClass(document.body, 'hidden-scrollbar');
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'hidden-scrollbar');
  }
  onSubmit() {
    if (this.isSwitchLoginMode) {
      console.log(this.signInForm.value);
      this.signInForm.reset();
    } else {
      console.log(this.signUpForm.value);
      this.signUpForm.reset();
    }
  }
  onSwitchLoginMode() {
    this.isSwitchLoginMode = !this.isSwitchLoginMode;
  }
}
