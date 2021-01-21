import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TruefalseComponent } from './truefalse.component';

describe('TruefalseComponent', () => {
  let component: TruefalseComponent;
  let fixture: ComponentFixture<TruefalseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruefalseComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TruefalseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
