import { CommonModule } from "@angular/common";
import { Component, Directive, ElementRef, HostListener, Injector, Input, NgModule } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { ValueAccessor } from "./value-accessor";

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

@Directive({
  selector: "ion-checkbox,ion-toggle",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BooleanValueAccessorDirective,
      multi: true,
    },
  ],
})
export class BooleanValueAccessorDirective extends ValueAccessor {
  constructor(injector: Injector, el: ElementRef) {
    super(injector, el);
  }

  override writeValue(value: any): void {
    this.el.nativeElement.checked = this.lastValue = value == null ? false : value;
  }

  @HostListener("ionChange", ["$event.target"])
  _handleIonChange(el: any): void {
    this.handleChangeEvent(el, el.checked);
  }
}

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FakeIonContentComponent,
    FakeIonCheckboxComponent,
    BooleanValueAccessorDirective,
  ],
  exports: [
    FakeIonContentComponent,
    FakeIonCheckboxComponent,
    BooleanValueAccessorDirective,
  ],
})
export class FakeIonicModule {

}
