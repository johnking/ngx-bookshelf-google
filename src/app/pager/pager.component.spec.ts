import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { click } from '../../testing';
import { PagerComponent } from './pager.component';

describe('PagerComponent', () => {
  let component: PagerComponent;
  let fixture: ComponentFixture<PagerComponent>;
  let de: DebugElement;

  const page = 3;
  const totalPages = 5;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;

    component.page = page;
    component.totalPages = totalPages;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a 'previous' link`, () => {
    de = fixture.debugElement.query(By.css('.pager-previous'));
    expect(de).toBeTruthy();
  });

  it(`should have a 'next' link`, () => {
    de = fixture.debugElement.query(By.css('.pager-next'));
    expect(de).toBeTruthy();
  });

  it(`should raise change page event when clicked 'Previous' link and current page decreae 1`, () => {
    de = fixture.debugElement.query(By.css('.pager-previous'));
    component.changePage.subscribe( (p: number) => expect(p).toEqual(page - 1));
    // de.triggerEventHandler('click', null);
    click(de);

  });

  it(`should raise change page event when clicked 'Next' link and current page increase 1`, () => {
    de = fixture.debugElement.query(By.css('.pager-next'));
    component.changePage.subscribe( (p: number) => expect(p).toEqual(page + 1));
    // de.triggerEventHandler('click', null);
    click(de);
  });
});
