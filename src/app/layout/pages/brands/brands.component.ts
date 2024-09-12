import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../shared/services/brand/brand.service';
import { Brands } from '../../../shared/interfaces/brands';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  brands:Brands[] = []
  showModal:boolean = false;
  image!:string
  name!:string
  title!:string
  constructor(private _BrandService:BrandService){}
  ngOnInit(){

    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage','/brands')
    }

    this._BrandService.getAllBrands().subscribe({
      next:(res)=>{
        this.brands = res.data
      }
    })
    
 }



 showBrand(bId:string){
  this._BrandService.getSpecBrand(bId).subscribe({
    next:(res)=>{
      this.showModal = true;
      this.name = res.data.slug;
      this.title = res.data.name;
      this.image = res.data.image;
    }
  })
 }
 closeBrand(){
  this.showModal = false;
 }
 
}
