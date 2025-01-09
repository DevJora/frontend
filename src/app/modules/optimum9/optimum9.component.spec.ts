import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Optimum9Component } from './optimum9.component';

describe('Optimum9Component', () => {
  let component: Optimum9Component;
  let fixture: ComponentFixture<Optimum9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Optimum9Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Optimum9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
