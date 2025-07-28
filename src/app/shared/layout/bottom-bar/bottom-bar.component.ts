import { Component } from '@angular/core';
import { LogoComponent } from "@app/shared/components/logo/logo.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  imports: [LogoComponent, TranslateModule],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.scss'
})
export class BottomBarComponent {

}
