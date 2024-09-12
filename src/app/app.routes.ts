import { HomeComponent } from './layout/pages/home/home.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { NotFoundComponent } from './layout/additions/not-found/not-found.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetpasswordComponent } from './layout/additions/forgetpassword/forgetpassword.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { CheckoutComponent } from './layout/additions/checkout/checkout.component';
import { WishlistComponent } from './layout/pages/wishlist/wishlist.component';

export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home", component:HomeComponent, canActivate:[authGuard],title:"Home"},
    {path:"login", component:LoginComponent,title:"Login"},
    {path:"register", component:RegisterComponent,title:"Register"},
    {path:"product", component:ProductsComponent,canActivate:[authGuard],title:"Product"},
    {path:"brands", component:BrandsComponent,canActivate:[authGuard],title:"Brands"},
    {path:"categories", component:CategoriesComponent,canActivate:[authGuard],title:"Categories"},
    {path:"cart", component:CartComponent,canActivate:[authGuard],title:"Cart"},
    {path:"forgetPassword",component:ForgetpasswordComponent,title:"ForgetPassword"},
    {path:"productdetails/:pId",component:ProductDetailsComponent,canActivate:[authGuard],title:"ProductDetails"},
    {path:"checkout/:id",component:CheckoutComponent,canActivate:[authGuard],title:"Checkout"},
    {path:"wishlist",component:WishlistComponent,canActivate:[authGuard],title:"Wishlist"},
    {path:"**", component:NotFoundComponent}
];
