import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  Input
} from "@angular/core";
import { Subscription } from "rxjs";
import { MainService } from "src/app/main.service";
import { Enemy } from "src/app/model/enemy/enemy";
import { BaseComponentComponent } from "src/app/base-component/base-component.component";

@Component({
  selector: "app-battle-table",
  templateUrl: "./battle-table.component.html",
  styleUrls: ["./battle-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattleTableComponent extends BaseComponentComponent {
  @Input() currentEnemy: Enemy;
  numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  getNumId(index: number, num: number) {
    return "" + num + (this.currentEnemy ? this.currentEnemy.id : "");
  }
}
