import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { Product } from '../../../shared/interfaces/product';
import { ProductDetailsComponent } from '../../additions/product-details/product-details.component';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductDetailsComponent,RouterLink,CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  productList!: Product[]
  isLoading: boolean = false
  constructor(private _WishlistService: WishlistService,private _CartService:CartService,private toastr: ToastrService) { }

  ngOnInit(): void {

    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage','/wishlist')
    }

    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.productList = res.data
      }
    })
  }

  addProduct(pId: string) {
    this.isLoading = true;
    this._CartService.addProductToCart(pId).subscribe({
      next: (res) => {
        this._CartService.cartNum.next(res.numOfCartItems)
        this.isLoading = false;
        this.toastr.success(res.message);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  removeItem(pId:string){
  this._WishlistService.removeProduct(pId).subscribe({
    next:()=>{
      this.toastr.show("Item Removed From Wishlist")
      this._WishlistService.getWishlist().subscribe({
        next:(x)=>{
          this.productList = x.data;
        }
      })
    }
  })
  }

  

}
