import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class PdfService {

  constructor() { }

  getPDF():string {
    return '';
  }
}