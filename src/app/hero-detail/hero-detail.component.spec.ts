import { TestBed, ComponentFixture, fakeAsync, tick, async } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { of } from "rxjs";

import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "../hero.service";


describe('Hero detail component', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroServ, mockLocation;

  beforeEach(() => {
    mockHeroServ = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => { return '3'; } }}
    }

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroServ },
        { provide: Location, useValue: mockLocation }
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroServ.getHero.and.returnValue(of({ id: 3, name: 'Super Dude', strength: 76 }));
  });

  it('Should render hero name in "h2" tag', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPER DUDE');
  });

  // it(`Should call updateHero when 'save' is called - observable`, fakeAsync(() => {
  //   mockHeroServ.updateHero.and.returnValue(of({}));
  //   fixture.detectChanges();
  //   fixture.componentInstance.save();
  //   tick(250);
  //   expect(mockHeroServ.updateHero).toHaveBeenCalled();
  // }));

  it(`Should call updateHero when 'save' is called - promise`, async(() => {
    mockHeroServ.updateHero.and.returnValue(of({}));
    fixture.detectChanges();
    fixture.componentInstance.save();

    fixture.whenStable().then(() => {
      expect(mockHeroServ.updateHero).toHaveBeenCalled();
    });

  }));

});
