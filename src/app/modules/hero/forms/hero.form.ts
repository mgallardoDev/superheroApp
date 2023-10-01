import { Validators } from "@angular/forms";

export const heroForm = {
  name: [''],
  alias: ['', [Validators.required]],
  publishing: ['', [Validators.required]],
}
