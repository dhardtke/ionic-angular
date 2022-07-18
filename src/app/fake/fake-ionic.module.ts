import { CommonModule } from "@angular/common";
import { Component, Input, NgModule } from "@angular/core";

@Component({
  selector: "ion-content, ion-item, ion-list, ion-label",
  template: `
    <ng-content></ng-content>`,
  styles: [
    `:host {
      display: block;
    }`,
  ],
})
export class FakeIonContentComponent {

}

@Component({
  selector: "ion-checkbox",
  template: ``,
})
export class FakeIonCheckboxComponent {
  @Input()
  checked?: boolean;
}

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FakeIonContentComponent,
    FakeIonCheckboxComponent,
  ],
  exports: [
    FakeIonContentComponent,
    FakeIonCheckboxComponent,
  ],
})
export class FakeIonicModule {

}
