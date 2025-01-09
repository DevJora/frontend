import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimumXComponent } from './optimum-x.component';

describe('OptimumXComponent', () => {
  let component: OptimumXComponent;
  let fixture: ComponentFixture<OptimumXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimumXComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptimumXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
