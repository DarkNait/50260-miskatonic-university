import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

export interface tableRow {
  tagName: string;
}

@Directive({
  selector: '[appTableStriped]'
})
export class TableStripedDirective implements OnInit, AfterViewInit, OnChanges {
  @Input()
  tableLength = 0;

  tableElement: HTMLTableElement = document.createElement('table');

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { 
    this.tableElement = this.elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    //console.log("NGONCHANCHES :" + this.elementRef.nativeElement.tBodies[0]?.rows.length + " rows");
    this.updateTableRows();  
  }

  ngOnInit(): void {
    this.tableElement = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.updateTableRows(); 
  }

  updateTableRows(): void{
    const trElements: NodeListOf<HTMLTableRowElement> = this.tableElement.querySelectorAll('tr');
    console.log(trElements.length);
    trElements.forEach((el, index) => {
      console.log(el, index);
      if(index % 2 != 0) {
        this.renderer.setStyle(el, 'background-color', '#C5E1A5');            
      }
    }); 
  }

}
