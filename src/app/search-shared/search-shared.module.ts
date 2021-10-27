import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchMaterialsModule } from '../search-materials/search-materials.module';
import { ResultRowComponent } from './components/result-row/result-row.component';

@NgModule({
  declarations: [ResultRowComponent],
  imports: [CommonModule, SearchMaterialsModule],
  exports: [ResultRowComponent],
})
export class SearchSharedModule {}
