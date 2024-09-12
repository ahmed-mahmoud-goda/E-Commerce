import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../../shared/services/checkout/checkout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{

  cartId:string=''

  constructor(private _CheckoutService:CheckoutService, private _ActivatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((res:any)=>{
      this.cartId = res.params.id
    })
  }

checkoutForm:FormGroup = new FormGroup({
  details: new FormControl(null,[Validators.required]),
  phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city: new FormControl(null,[Validators.required])
})


checkoutApi(){
this._CheckoutService.checkOut(this.cartId,this.checkoutForm.value).subscribe({
  next:(res)=>{
    window.open(res.session.url,"_self")
  },
  error:(err)=>{
    console.log(err)
  }
})
}

}
