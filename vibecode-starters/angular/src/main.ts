import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div style="padding: 3rem; text-align: center;">
      <h1 style="color: #dd0031; font-size: 3rem; margin-bottom: 0.5rem;">Angular Vibe</h1>
      <p style="color: #8f8f9e; font-size: 1.2rem;">Running inside browser WebContainers</p>
      <div style="margin-top: 2rem; padding: 2rem; background: #1b1b1f; border: 1px solid #2a2a30; border-radius: 12px; display: inline-block;">
        <p>Edit <code>src/main.ts</code> to update this standalone component.</p>
      </div>
    </div>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
