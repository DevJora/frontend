import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Optimum4Component } from './optimum4.component';

describe('Optimum4Component', () => {
  let component: Optimum4Component;
  let fixture: ComponentFixture<Optimum4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Optimum4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Optimum4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
