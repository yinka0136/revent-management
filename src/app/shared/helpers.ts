import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidator {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): any => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  public static passwordMatchValidator(control: AbstractControl): void {
    const password: string = control.get('password')!.value;
    const confirmPassword: string = control.get('confirmPassword')!.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')!.setErrors({ NoPasswordMatch: true });
    }
  }
}
