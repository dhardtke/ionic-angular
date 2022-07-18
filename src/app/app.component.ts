import { ChangeDetectorRef, Component, NgZone, OnInit } from "@angular/core";

export interface Tree {
  name: string;
  children: Tree[];
  id: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "ionic";
  checked: boolean = false;

  tree: Tree[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    document.documentElement.classList.add("hydrated");
  }

  ngOnInit(): void {
    //this.changeDetectorRef.detach();
    let items = 0;
    this.tree = this.generate("Region", 5);
    setTimeout(() => {
      for (const region of this.tree) {
        items++;
        setTimeout(() => {
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
        }, 1000);
      }
    }, 1000);
    console.log(`Generated ${items} items`);
    //this.changeDetectorRef.detectChanges();
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
