import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

const PasswordLiterals = {
  UpperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  LowerCase: 'abcdefghijklmnopqrstuvwxyz',
  Numerals: '0123456789',
  SpecialChars: '^$*.[]{}()?-!@#%&/,><:;|_~`+=' // Not supporting single quote, double quote and forward slash even though aws allows it.
};

const TrailingSpacesRegExp = /^\s+|\s+$/g;

export class AuthValidators {
  static passwordPolicyValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = (control.value as string).trim();
    let hasAtLeastOneUpperCase = false,
      hasAtLeastOneLowerCase = false,
      hasAtLeastOneNumber = false,
      hasAtLeastOneSpecialChar = false;

    for (const char of password) {
      if (
        !hasAtLeastOneUpperCase &&
        PasswordLiterals.UpperCase.includes(char)
      ) {
        hasAtLeastOneUpperCase = true;
      }

      if (
        !hasAtLeastOneLowerCase &&
        PasswordLiterals.LowerCase.includes(char)
      ) {
        hasAtLeastOneLowerCase = true;
      }

      if (!hasAtLeastOneNumber && PasswordLiterals.Numerals.includes(char)) {
        hasAtLeastOneNumber = true;
      }

      if (
        !hasAtLeastOneSpecialChar &&
        PasswordLiterals.SpecialChars.includes(char)
      ) {
        hasAtLeastOneSpecialChar = true;
      }
    }

    if (
      hasAtLeastOneUpperCase &&
      hasAtLeastOneLowerCase &&
      hasAtLeastOneNumber &&
      hasAtLeastOneSpecialChar
    ) {
      return null;
    }

    return { invalid: true };
  }

  static checkPasswordPolicyValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.value as string;
    return null;
  }
}
