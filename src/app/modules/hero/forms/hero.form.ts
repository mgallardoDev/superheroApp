import { Validators } from '@angular/forms';

const namesFormatRegEx = '^[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*( [a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*)*$';

export const heroForm = {
  name: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(namesFormatRegEx),
    ],
  ],
  alias: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(namesFormatRegEx),
    ],
  ],
  publishing: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(namesFormatRegEx),
    ],
  ],
};
