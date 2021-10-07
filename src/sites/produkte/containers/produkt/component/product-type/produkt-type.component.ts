import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProduktTypeComponent),
  multi: true,
};
@Component({
  selector: 'product-type',
  styleUrls: ['./product-type.component.scss'],
  providers: [TYPE_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product-type">
      <div
        class="product-type__pane"
        *ngFor="let selector of selectors; let i = index"
        [class.active]="selector === value"
        (click)="setSelected(selector)"
      >
        <!--        <img src="/assets/{{ selector }}.svg" />-->
        <i [class]="icons[i]"></i>
        <p>{{ selector }}</p>
      </div>
    </div>
  `,
})
export class ProduktTypeComponent implements ControlValueAccessor {
  selectors = ['verbrauch', 'gebrauch'];
  icons = ['bi-lightning-fill', 'bi-arrow-repeat'];

  value: string | undefined;

  private onTouch: Function | undefined;
  private onModelChange: Function | undefined;

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  writeValue(value: string) {
    this.value = value;
  }

  setSelected(value: string) {
    this.value = value;
    if (this.onModelChange) this.onModelChange(value);
    if (this.onTouch) this.onTouch();
  }
}
