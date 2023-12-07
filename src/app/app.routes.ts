import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component"
import {FormComponent} from "./components/form/form.component";
import {ChargeFormComponent} from "./components/charge-form/charge-form.component";
import {PaymentHistoryComponent} from "./components/payment-history/payment-history.component";

export const routes: Routes = [
  {path:"", component: HomeComponent},
  {path: "create", component: FormComponent},
  {path: "create/:id", component: FormComponent},
  {path: "charge",component: ChargeFormComponent},
  {path: "payment/history",component: PaymentHistoryComponent},
];
