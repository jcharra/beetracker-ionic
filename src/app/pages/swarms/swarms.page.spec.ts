import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwarmsPage } from './swarms.page';

describe('SwarmsPage', () => {
  let component: SwarmsPage;
  let fixture: ComponentFixture<SwarmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwarmsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwarmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});