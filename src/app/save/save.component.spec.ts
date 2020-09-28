import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from "@angular/core/testing";

import { SaveComponent } from "./save.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { testImports } from "../app.component.spec";
import { FormatPipe } from "../format.pipe";
import { MainService } from "../main.service";
import { OptionsService } from "../options.service";
import { TimePipe } from "../time.pipe";

describe("SaveComponent", () => {
  let component: SaveComponent;
  let fixture: ComponentFixture<SaveComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: testImports,
        declarations: [SaveComponent, FormatPipe],
        providers: [MainService, OptionsService, FormatPipe, TimePipe]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
