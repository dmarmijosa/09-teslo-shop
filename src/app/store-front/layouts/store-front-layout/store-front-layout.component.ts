import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbarComponent } from "../../components/front-navbar/front-navbar.component";
import { ScrollStateService } from '@products/services/scrollState.service';

@Component({
  selector: 'store-front-layout',
  imports: [RouterOutlet, FrontNavbarComponent],
  templateUrl: './store-front-layout.component.html',
})
export class StoreFrontLayoutComponent {
  scrollService = inject(ScrollStateService);

  ngAfterViewInit(){
    if(this.scrollService.scrollStateValue){
      setTimeout(() => {
        window.scrollTo(0, this.scrollService.scrollStateValue ?? 0);
      }, 1000);
    }
  }

  onScroll(event: Event){
    const scrollWindows  = window.scrollY;
    this.scrollService.setScrollState(scrollWindows);
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
