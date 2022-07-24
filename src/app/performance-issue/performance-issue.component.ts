import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Tree } from "./tree.component";

@Component({
  selector: "performance-issue",
  templateUrl: "./performance-issue.component.html",
})
export class PerformanceIssueComponent implements OnInit {
  longList = Array.from(Array(10000).keys());

  tree: Tree[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    document.documentElement.classList.add("hydrated");
  }

  ngOnInit(): void {
    this.changeDetectorRef.detach();

    let items = 0;
    this.tree = this.generate("Region", 5);
    for (const region of this.tree) {
      items++;
      region.children = this.generate("Area", 2);
      for (const area of region.children) {
        items++;
        area.children = this.generate("District", 5);
        for (const district of area.children) {
          items++;
          district.children = this.generate("Line", 100);
          for (const line of district.children) {
            items++;
          }
        }
      }
    }
    console.log(`Generated ${items} items`);
    this.changeDetectorRef.detectChanges();
  }

  generate(prefix: string, count: number): Tree[] {
    const trees: Tree[] = [];
    for (let i = 1; i <= count; i++) {
      trees.push({
        id: `${prefix} ${i}`,
        name: `${prefix} ${i}`,
        children: [],
      });
    }
    return trees;
  }

  trackById(_i: number, item: Tree): string {
    return item.id;
  }
}
