import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

const PasswordPolicyLiterals = {
  UpperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  LowerCase: 'abcdefghijklmnopqrstuvwxyz',
  Numerals: '0123456789',
  MinLength: 8,
  // Not supporting single quote, double quote and forward slash
  // even though aws cognito password policy allows it.
  SpecialChars: '^$*.[]{}()?-!@#%&/,><:;|_~`+='
};

export class AuthValidators {
  // New aws cognito password policy validator
  static checkPasswordPolicy(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.value as string;
    let validationErrors: { [key: string]: boolean } | null = null;

    const policyFlags: { [key: string]: boolean } = {
      hasAtLeastOneUpperCase: false,
      hasAtLeastOneLowerCase: false,
      hasAtLeastOneNumber: false,
      hasAtLeastOneSpecialChar: false
    };

    const checkPolicyLiteral = (
      flagName: string,
      char: string,
      literal: 'UpperCase' | 'LowerCase' | 'Numerals' | 'SpecialChars'
    ) => {
      if (
        !policyFlags[flagName] &&
        PasswordPolicyLiterals[literal].includes(char)
      ) {
        policyFlags[flagName] = true;
      }
    };

    for (const char of password) {
      checkPolicyLiteral('hasAtLeastOneUpperCase', char, 'UpperCase');
      checkPolicyLiteral('hasAtLeastOneLowerCase', char, 'LowerCase');
      checkPolicyLiteral('hasAtLeastOneNumber', char, 'Numerals');
      checkPolicyLiteral('hasAtLeastOneSpecialChar', char, 'SpecialChars');
    }

    [
      ['hasAtLeastOneUpperCase', 'noUpperCase'],
      ['hasAtLeastOneLowerCase', 'noLowerCase'],
      ['hasAtLeastOneNumber', 'noNumber'],
      ['hasAtLeastOneSpecialChar', 'noSpecialChar']
    ].forEach(opt => {
      if (!policyFlags[opt[0]]) {
        validationErrors = validationErrors ?? {};
        validationErrors[opt[1]] = true;
      }
    });

    if (password.length < PasswordPolicyLiterals.MinLength) {
      validationErrors = validationErrors ?? {};
      validationErrors['noMinLength'] = true;
    }

    return validationErrors;
  }

  static match(firstControlKey: string, secondControlKey: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const firstControl = (control as FormGroup).get(firstControlKey);
      const secondControl = (control as FormGroup).get(secondControlKey);

      if (firstControl?.value !== secondControl?.value) {
        return { nomatch: true };
      }

      return null;
    };
  }
}
