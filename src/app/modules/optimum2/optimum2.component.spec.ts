import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Optimum2Component } from './optimum2.component';

describe('Optimum2Component', () => {
  let component: Optimum2Component;
  let fixture: ComponentFixture<Optimum2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Optimum2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Optimum2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
