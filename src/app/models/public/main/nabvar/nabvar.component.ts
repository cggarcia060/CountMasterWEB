import { Component } from '@angular/core';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.scss']
})
export class NabvarComponent  {
  isCollapsed=true;

  change(value: boolean): void {
    console.log(value);
  }
}
