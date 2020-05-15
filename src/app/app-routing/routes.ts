import {MenuComponent} from '../menu/menu.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import {Routes } from '@angular/router';

export const routes : Routes =[
    {path:"about" , component:AboutComponent},
    {path:"contact", component:ContactComponent},
    {path:"home", component: HomeComponent},
    {path:"menu", component:MenuComponent},
    {path:"", component:HomeComponent},
    {path: "dishdetail/:id", component: DishdetailComponent }
];