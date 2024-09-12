import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Categories } from '../../../shared/interfaces/categories';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent,CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  categories!:Categories[]

constructor(private _CategoriesService:CategoriesService){}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }},
    nav: true,
    rtl: true
  }

  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 6
      }},
    nav: true,
    rtl: true
  }
 
  ngOnInit(){

    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage','/home')
    }
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories = res.data
      }
    })
 }



}
