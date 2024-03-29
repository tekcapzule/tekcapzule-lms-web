export function shuffleArray(array: any[], count?: number): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return count && count > 0 ? array.slice(0, count) : array;
}

export function toUpperCamelCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

export function isNullOrUndefined(value: any) {
  return value === undefined || value === null;
}

export function allowOnlyNumericInput(event: KeyboardEvent) {
  const keyCode = event.keyCode || event.which;

  if (
    keyCode === 8 || // backspace
    keyCode === 9 || // tab
    (keyCode >= 48 && keyCode <= 57) // 0-9
  ) {
    return true;
  }

  return false;
}

export function allowNonSpaceCharacterInput(event: KeyboardEvent) {
  const keyCode = event.keyCode || event.which;

  if (
    keyCode === 32 // space
  ) {
    return false;
  }

  return true;
}
