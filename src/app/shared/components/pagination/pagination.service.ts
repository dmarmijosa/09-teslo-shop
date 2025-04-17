import {inject, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => {
        const page = Number(params.get('page')) || 1;
        if (isNaN(page)) {
          this.route.navigate([], { queryParams: { page: 1 }, queryParamsHandling: 'merge' });
          return 1;
        }
        return page;
      })
    ),
    {
      initialValue: 1,
    }
  );
}
