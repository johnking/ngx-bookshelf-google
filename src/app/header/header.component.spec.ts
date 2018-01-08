import { async, fakeAsync, ComponentFixture, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

@Component({
  template: ''
})
class FakeSearchComponent {}

@Component({
  template: ''
})
class FakeBookComponent {}

@Component({
  template: ''
})
class FakeLibraryComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: HTMLElement;

  // async setup for external template and style.
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'library', component: FakeLibraryComponent},
          {path: 'search', component: FakeSearchComponent},
          {path: 'book/:bookId', component: FakeBookComponent},
        ])
      ],
      declarations: [
        HeaderComponent,
        FakeBookComponent,
        FakeSearchComponent,
        FakeLibraryComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it(`should have 3 links`, fakeAsync(inject([Router, Location], (router: Router, location: Location) => {
    const des = fixture.debugElement.queryAll(By.css('a'));
    expect(des.length).toBe(3);
  })));

  it(`should go to the specif page after click the link`, async(inject([Router, Location], (router: Router, location: Location) => {
    const des = fixture.debugElement.queryAll(By.css('a'));
    el =  des[1].nativeElement;
    el.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toContain(el.innerText.toLowerCase());
    });
  })));
});
