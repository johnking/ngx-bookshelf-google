import { async, fakeAsync, ComponentFixture, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let appComp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  // we need async when using external template and styles
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
    }).compileComponents(); // give time to compile tempate and style
  });

  // synchronous beforeEach after async setup
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComp = fixture.componentInstance;
  });

  it(`should create the app`, (() => {
    expect(appComp).toBeTruthy();
  }));

  it(`should have a h1 tag`, (() => {
    de = fixture.debugElement.query(By.css('h1'));
    expect(de).toBeTruthy();
  }));

  it(`should render title-'app' in a h1 tag`, (() => {
    de = fixture.debugElement.query(By.css('h1'));
    expect(de).toBeTruthy();
    fixture.detectChanges();
    el = de.nativeElement;
    expect(el.textContent).toContain('app');
  }));
});
