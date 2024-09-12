import { Categories } from './../../../shared/interfaces/categories';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  categories:Categories[] = [];
  subCategories:any
  subcategoryname!:string
  showSub:boolean = false;
  constructor(private _CategoriesService:CategoriesService){}

  ngOnInit(){

    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage','/categories')
    }
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories = res.data
      }
    })
 }

 showSpecCategory(cId:string){
    this._CategoriesService.getSpecCategory(cId).subscribe({
      next:(res)=>{
        this.showSub = true;
        this.subcategoryname = res.data.name;
      }
    })
    this._CategoriesService.getSubcategory(cId).subscribe({
      next:(res)=>{
        this.subCategories = res.data;
      }
    })
 }
}
