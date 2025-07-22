import { Component } from '@angular/core';
import { LogoComponent } from "@app/shared/components/logo/logo.component";

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.scss'
})
export class BottomBarComponent {

}
