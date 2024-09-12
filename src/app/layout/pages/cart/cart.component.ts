import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../../shared/interfaces/cart';
import { CartService } from './../../../shared/services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  myCart!: Cart

  constructor(private _CartService: CartService, private toastr: ToastrService) { }
  ngOnInit() {

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/cart')
    }

    this._CartService.getCart().subscribe({
      next: (res) => {
        console.log(res);
        this.myCart = res
      },
      error: (err) => {
        console.log(err);

      }
    })

  }

  updateQuantity(pId: string, pCount: number) {
    this._CartService.updateProductQuantity(pId, pCount.toString()).subscribe({
      next: (res) => {
        console.log(res);
        this.myCart = res;
        this.toastr.success("Cart Updated");
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeItem(pId: string) {
    this._CartService.removeSpecItem(pId).subscribe({
      next: (res) => {
        console.log(res);
        this.myCart = res;
        this.toastr.error("Item Deleted");
        this._CartService.cartNum.next(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if(res.message == 'success'){
          this.myCart = {} as Cart;
          this._CartService.cartNum.next(0);
        }
      },
      error: (err) => {
console.log(err);

      }
    })
  }

}
