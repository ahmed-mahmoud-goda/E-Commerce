import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule,CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {


  wishList: string[] = []

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
      }
    },
    nav: true,
    rtl:true
  }


myProduct!:Product

  constructor(private _ProductService: ProductService,private _CartService:CartService ,private _ActivatedRoute: ActivatedRoute,private toastr:ToastrService,private _WishlistService:WishlistService) { }
  isLoading:boolean = false

  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        for (let i = 0; i < res.data.length; i++){
          this.wishList.push(res.data[i].id);
      }
    }
    })

    this._ActivatedRoute.paramMap.subscribe((res:any)=>{
    
      this._ProductService.getSpecproduct(res.params.pId).subscribe({
        next:(res)=>{
          console.log(res);
          this.myProduct = res.data
        },
        error:(err)=>{
          console.log(err);
        }

      })

    })

   
  }

  addToCart(pId:string){
    this.isLoading = true;
    this._CartService.addProductToCart(pId).subscribe({
      next:(res)=>{
        this._CartService.cartNum.next(res.numOfCartItems)
      this.isLoading = false;
      this.toastr.success(res.message);
      }
    })
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
