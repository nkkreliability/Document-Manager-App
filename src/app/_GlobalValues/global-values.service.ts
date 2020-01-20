import { Injectable } from '@angular/core';
import { MinimumPasswordLength, PrestartValues } from './global-values';

@Injectable({
  providedIn: 'root'
})
export class GlobalValuesService {
  constructor() { }
  GetMinimumPasswordLength(): number { return MinimumPasswordLength; }
}
