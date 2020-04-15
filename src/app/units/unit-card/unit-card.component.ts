import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  Input,
  ViewChild,
  TemplateRef
} from "@angular/core";
import { Subscription } from "rxjs";
import { MainService } from "src/app/main.service";
import { Unit } from "src/app/model/units/unit";
import { ONE } from "src/app/model/CONSTANTS";
import { Production } from "src/app/model/units/production";
import { Price } from "src/app/model/prices/price";
import { NzModalService, NzModalRef } from "ng-zorro-antd";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Router } from "@angular/router";
import { BaseComponentComponent } from "src/app/base-component/base-component.component";

@Component({
  selector: "app-unit-card",
  templateUrl: "./unit-card.component.html",
  styleUrls: ["./unit-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitCardComponent extends BaseComponentComponent {
  @Input() unit: Unit;
  tplModal: NzModalRef;
  popoverTrigger: string = null;
  actions = [];
  sliderDisabled = false;
  index1 = 0;
  isVisible = false;
  Decimal = Decimal;

  @ViewChild("buyOne", { static: true })
  private buyOne: TemplateRef<any>;
  @ViewChild("buyHalf", { static: true })
  private buyHalf: TemplateRef<any>;
  @ViewChild("buyMax", { static: true })
  private buyMax: TemplateRef<any>;
  @ViewChild("buyNone", { static: true })
  private buyNone: TemplateRef<any>;

  constructor(
    ms: MainService,
    cd: ChangeDetectorRef,
    private modalService: NzModalService,
    public breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    super(ms, cd);
  }
  ngOnInit() {
    this.popoverTrigger = "hover";
    this.sliderDisabled = !this.unit.production.find((p) => p.ratio.lt(0));
    this.getActions();
    this.subscriptions.push(
      this.ms.updateEmitter.subscribe(() => {
        this.getActions();
        this.cd.markForCheck();
      }),
      this.breakpointObserver
        .observe(["(min-width: 959px)"])
        .subscribe((state: BreakpointState) => {
          this.popoverTrigger = state.matches ? "hover" : "null";
        })
    );
  }
  getActions() {
    this.unit.reloadMaxBuy();
    const newActions = [];

    if (this.unit.buyPrice.canBuy) {
      newActions.push(this.buyOne);
      if (this.unit.buyPrice.maxBuy.gte(4)) {
        newActions.push(this.buyHalf);
      }
      if (this.unit.buyPrice.maxBuy.gte(2)) {
        newActions.push(this.buyMax);
      }
    } else {
      newActions.push(this.buyNone);
    }

    if (
      newActions.length !== this.actions.length ||
      this.actions[0] !== newActions[0]
    ) {
      this.actions = newActions;
    }
  }
  buyOneAct() {
    this.unit.buy(ONE);
  }
  buyHalfAct() {
    this.unit.buy(this.unit.buyPrice.maxBuy.div(2).floor());
  }
  buyMaxAct() {
    this.unit.buy(this.unit.buyPrice.maxBuy);
  }
  getProdId(index: number, production: Production) {
    return index + production.producer.id + production.product.id;
  }
  getPriceId(index: number, pri: Price) {
    return index + pri.spendable.id;
  }
  createModal(tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tplModal = this.modalService.create({
      nzTitle: this.unit.name,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: true,
      nzClosable: true
    });
  }
  destroyTplModal() {
    this.tplModal.destroy();
  }
  goModPage() {
    this.router.navigate(["/mod/" + this.unit.id]);
  }
}
