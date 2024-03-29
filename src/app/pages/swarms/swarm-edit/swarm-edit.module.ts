import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SwarmEditPageRoutingModule } from "./swarm-edit-routing.module";

import { SwarmEditPage } from "./swarm-edit.page";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwarmEditPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [SwarmEditPage],
})
export class SwarmEditPageModule {}
