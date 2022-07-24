import { ApplicationInitStatus } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { IonicTestingIssueComponent } from "./ionic-testing-issue.component";

describe("IonicTestingIssueComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IonicTestingIssueComponent,
      ],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
      ],
    }).compileComponents();

    // until https://github.com/angular/angular/issues/24218 is fixed
    await TestBed.inject(ApplicationInitStatus).donePromise;
  });

  async function wait(timeInMs: number): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(resolve, timeInMs);
    });
  }

  async function appInit(): Promise<void> {
    return new Promise<void>(resolve => {
      const l = () => {
        window.removeEventListener("appload", l);
        resolve();
      };
      window.addEventListener("appload", l);
    });
  }

  it("should toggle checkboxes correctly", async () => {
    const fixture = TestBed.createComponent(IonicTestingIssueComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    // await wait(100); // initial ionic render
    await stencilReady();

    const toggle = fixture.debugElement.query(e => e.name === "ion-toggle");

    toggle.nativeElement.click();
    fixture.detectChanges();
    // await wait(300); // wait for ion-checkbox to be initialized
    //await appInit();
    await stencilReady();

    expect(fixture.componentInstance.checked).toBeTrue();
    const checkbox = fixture.debugElement.query(e => e.name === "ion-checkbox");
    expect(checkbox.nativeElement.innerHTML).not.toEqual("");

    toggle.nativeElement.click();
    fixture.detectChanges();
    // await wait(300); // process click
    //await appInit();

    expect(fixture.componentInstance.checked).toBeFalse();

    // TODO add jest with JSDom for comparison
  });

  // based on https://github.com/ionic-team/stencil/blob/a13b2172d605bd684e064101b8195d66a31df745/test/karma/test-app/util.ts#L105=
  const allReady = () => {
    const promises: Promise<any>[] = [];
    const waitForDidLoad = (promises: Promise<any>[], elm: Element) => {
      if (elm != null && elm.nodeType === 1) {
        for (let i = 0; i < elm.children.length; i++) {
          const childElm = elm.children[i];
          if (childElm.tagName.includes('-') && typeof (childElm as any).componentOnReady === 'function') {
            promises.push((childElm as any).componentOnReady());
          }
          waitForDidLoad(promises, childElm);
        }
      }
    };

    waitForDidLoad(promises, window.document.documentElement);

    return Promise.all(promises).catch((e) => console.error(e));
  };

  function waitFrame() {
    return new Promise((resolve) => {
      requestAnimationFrame(resolve);
    });
  }

  const stencilReady = (): Promise<any> => {
    return allReady()
    .then(() => waitFrame())
    .then(() => allReady());
  };
});
