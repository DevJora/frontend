import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Optimum8Component } from './optimum8.component';

describe('Optimum8Component', () => {
  let component: Optimum8Component;
  let fixture: ComponentFixture<Optimum8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Optimum8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Optimum8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
