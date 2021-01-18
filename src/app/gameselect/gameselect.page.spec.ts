import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GameselectPage } from './gameselect.page';

describe('GameselectPage', () => {
  let component: GameselectPage;
  let fixture: ComponentFixture<GameselectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameselectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameselectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
