import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent {
  rutasGender = [
    { ruta: '/gender/men', title: 'Hombres' },
    { ruta: '/gender/woman', title: 'Mujeres' },
    { ruta: '/gender/kids', title: 'Niños' },
  ];
}
