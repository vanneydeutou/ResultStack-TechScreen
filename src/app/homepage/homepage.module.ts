import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { SearchSharedModule } from '../search-shared/search-shared.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SearchMaterialsModule } from '../search-materials/search-materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchMaterialsModule,
    SearchSharedModule,
    HomepageRoutingModule,
  ],
})
export class HomepageModule {}
