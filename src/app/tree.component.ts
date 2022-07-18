import { Component, Input, ViewEncapsulation } from "@angular/core";
import { Tree } from "./app.component";

@Component({
  selector: "cmp-tree",
  templateUrl: "./tree.component.html",
  //encapsulation: ViewEncapsulation.ShadowDom,
  styles: [
    `
      .level-1 {
        margin-left: 1rem;
      }

      .level-2 {
        margin-left: 2rem;
      }

      .level-3 {
        margin-left: 3rem;
      }

      .level-4 {
        margin-left: 4rem;
      }
    `,
  ],
})
export class TreeComponent {
  @Input()
  level: number = 1;

  @Input()
  node?: Tree;

  trackById(_i: number, item: Tree): string {
    return item.id;
  }
}
