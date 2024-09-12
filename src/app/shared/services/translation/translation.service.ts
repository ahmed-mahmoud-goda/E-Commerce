import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private _TranslateService: TranslateService) {
    if (typeof localStorage !== 'undefined') {
      _TranslateService.setDefaultLang('en')
      const lang = localStorage.getItem('lang')
      if (lang) {
        _TranslateService.use(lang)
      }
      this.changeDir()
    }
  }

  changeDir() {
    if (localStorage.getItem('lang') == 'ar') {
      document.dir = 'rtl'
    }
    else if (localStorage.getItem('lang') == 'en') {
      document.dir = 'ltr'
    }
  }

  changeLang(lang: string) {
    localStorage.setItem('lang', lang)
    this._TranslateService.use(lang)
    this.changeDir()
  }
}
