export class FleetShips {
  shipsQuantity = 0;
  wantedShips = 0;
  wantedShipsUi = 0;
  navalCapPercent = 50;
  navalCapPercentUi = 50;

  //#region Save and Load
  getData(): any {
    return {
      s: this.shipsQuantity,
      n: this.navalCapPercent
    };
  }
  load(data: any) {
    if ("s" in data) {
      this.shipsQuantity = data.s;
    }
    if ("n" in data) {
      this.navalCapPercent = data.n;
    }
    this.navalCapPercentUi = this.navalCapPercent;
  }
  //#endregion
}
