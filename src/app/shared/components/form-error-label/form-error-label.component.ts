import { Component, input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormUtils } from '@shared/utils/forms-utils';

@Component({
  selector: 'form-error-label',
  imports: [],
  template: `
  <span class="text-red-500 text-xs">{{ errorMessage }}</span>

  `
})
export class FormErrorLabelComponent {
  control = input.required<AbstractControl>();

  get errorMessage() {
    const errors: ValidationErrors = this.control().errors || {};
    return this.control().touched && Object.keys(errors).length > 0
      ? FormUtils.getTextError(errors)
      : null;
  }
}
