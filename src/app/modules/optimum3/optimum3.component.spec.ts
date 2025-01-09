import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Optimum3Component } from './optimum3.component';

describe('Optimum3Component', () => {
  let component: Optimum3Component;
  let fixture: ComponentFixture<Optimum3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Optimum3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Optimum3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
