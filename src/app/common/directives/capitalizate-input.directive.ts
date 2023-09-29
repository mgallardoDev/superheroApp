import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appCapitalizeWords]'
})
export class CapitalizeWordsDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {     
    const transformed = capitalizeWords(event.target.value);
    this.renderer.setProperty(this.el.nativeElement, 'value', transformed);
  }
}

function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}