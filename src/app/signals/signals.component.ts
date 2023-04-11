import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { Widget } from '../types';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
    We have {{counter() | async}} widget(s)
      <ul>
        <li *ngFor="let widget of widgets()">
          {{ widget.description }}
          <input
            [value]="widget.description"
            (input)="updateWidget($event, widget.id)"
          />
          <button (click)="removeWidget(widget.id)">Remove</button>
        </li>
      </ul>
    </section>
    <section>
      <input id="add-widget" /><button (click)="addWidget()">Add Widget</button>
    </section>
    <section><button (click)="clearAllWidgets()">Clear All</button></section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsComponent {
  public widgets = signal<Widget[]>([{ id: 0, description: 'Thingamajig' }]);
  public counter = computed(async () => {
    return this.widgets().length;
  });
  constructor(private readonly _cdr: ChangeDetectorRef) {}

  addWidget() {
    const description = (
      document.getElementById('add-widget') as HTMLInputElement
    )?.value;

    if (description) {
      const widget: Widget = {
        id: this.widgets().length + 1,
        description: description,
      };
      this.widgets.update((widgets) => [...widgets, widget]);
    }
  }

  updateWidget(event: Event, id: number) {
    this.widgets.mutate(async (widgets) => {
      let widget = widgets.find((w) => w.id === id);
      if (widget) {
        widget.description = (event.target as HTMLInputElement).value;
      }
    });
  }

  removeWidget(index: number) {
    this.widgets.update(
      (widgets) => (widgets = widgets.filter((w) => w.id !== index))
    );
  }

  clearAllWidgets() {
    this.widgets.set([]);
  }
}
