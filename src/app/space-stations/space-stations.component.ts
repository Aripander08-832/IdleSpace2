import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  AfterViewInit
} from "@angular/core";
import { Unit } from "../model/units/unit";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { fadeIn } from "../animations";
import { BaseComponentComponent } from "../base-component/base-component.component";
import { SpaceStation } from "../model/units/spaceStation";

@Component({
  selector: "app-space-stations",
  templateUrl: "./space-stations.component.html",
  styleUrls: ["./space-stations.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn]
})
export class SpaceStationsComponent extends BaseComponentComponent
  implements OnInit, OnDestroy, AfterViewInit {
  sortName: string | null = "id";
  sortValue: string | null = "ascend";
  listOfStations: Unit[];
  ngOnInit() {
    this.search();
    this.subscriptions.push(
      this.ms.updateEmitter.subscribe(() => {
        this.cd.markForCheck();
      })
    );
  }
  addStation(unit: SpaceStation) {
    if (!unit) return false;
    this.ms.game.spaceStationManager.addJob(unit);
  }
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.ms.game.spaceStationManager.toDo,
      event.previousIndex,
      event.currentIndex
    );
    this.ms.game.spaceStationManager.postUpdate();
  }
  getUnitId(index: number, unit: Unit) {
    return unit.id;
  }
  formatter(value: number): string {
    return `${value}%`;
  }
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }
  search() {
    /* tslint:disable */
    if (this.ms.game.resourceManager.unlockedSpaceStations.length < 1) return;
    if (this.sortName && this.sortValue) {
      if (
        this.ms.game.resourceManager.unlockedSpaceStations[0][
          this.sortName!
        ] instanceof Decimal
      ) {
        this.listOfStations = this.ms.game.resourceManager.unlockedSpaceStations
          .slice()
          .sort((a, b) =>
            this.sortValue === "ascend"
              ? a[this.sortName!].cmp(b[this.sortName!])
              : b[this.sortName!].cmp(a[this.sortName!])
          );
      } else {
        this.listOfStations = this.ms.game.resourceManager.unlockedSpaceStations
          .slice()
          .sort((a, b) =>
            this.sortValue === "ascend"
              ? a[this.sortName!] > b[this.sortName!]
                ? 1
                : -1
              : b[this.sortName!] > a[this.sortName!]
              ? 1
              : -1
          );
      }
    }
    /* tslint:enable */
  }
}
