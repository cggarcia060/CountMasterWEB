/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NabvarComponent } from './nabvar.component';

describe('NabvarComponent', () => {
  let component: NabvarComponent;
  let fixture: ComponentFixture<NabvarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NabvarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NabvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
