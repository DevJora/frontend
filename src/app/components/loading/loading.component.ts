import { Component } from '@angular/core';
import {LoadingService} from '../../services/loading.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
