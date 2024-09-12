import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipes/onsale/onsale.pipe';
import { FilterPipe } from '../../../shared/pipes/filter/filter.pipe';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule, RouterLink, CurrencyPipe, OnsalePipe, FilterPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  productSub!: Subscription;
  wishListSub!: Subscription;
  isActive!:boolean;
  searchTerm: string = ""

  

  productList: Product[] = []
  isLoading: boolean = false
  wishList: string[] = []
  @Input() isProduct:boolean = true;
  constructor(private _productService: ProductService, private _WishlistService: WishlistService, private _CartService: CartService, private toastr: ToastrService) { }

  ngOnInit() {
    if(this.isProduct){
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/product')
    }
  }

    this.wishListSub = this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        for (let i = 0; i < res.data.length; i++){
          this.wishList.push(res.data[i].id);
      }
    }
    })
    this.productSub = this._productService.getAllProducts().subscribe({
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

ngOnDestroy(): void {
  this.productSub?.unsubscribe()
  this.wishListSub?.unsubscribe()
}

checkWishList(pId:string):boolean{
  return this.wishList.includes(pId)
}

toggleWishlist(pId: string): void {
  if (this.checkWishList(pId)) {
    this.wishList = this.wishList.filter(itemId => itemId !== pId);
    this._WishlistService.removeProduct(pId).subscribe({
      next:(res)=>{
        this.toastr.show("Item Removed From Wishlist");
      }
    })
  } else {
    this.wishList.push(pId);
    this._WishlistService.addToWishlist(pId).subscribe({
      next:(res)=>{
        this.toastr.success("Item Added To Wishlist");
      }
    })
  }
}

}
