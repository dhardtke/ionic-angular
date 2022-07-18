import { ApplicationInitStatus } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AppComponent } from "./app.component";
import { TreeComponent } from "./tree.component";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TreeComponent,
      ],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
      ],
    }).compileComponents();

    // until https://github.com/angular/angular/issues/24218 is fixed
    await TestBed.inject(ApplicationInitStatus).donePromise;
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ionic'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("ionic");
  });

  async function wait(timeInMs: number): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(resolve, timeInMs);
    });
  }

  it("should render title", async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = fixture.debugElement.query(e => e.name === "ion-toggle");

    toggle.nativeElement.click();
    fixture.detectChanges();

    await wait(300);

    console.log(compiled.innerHTML);
  });
});
