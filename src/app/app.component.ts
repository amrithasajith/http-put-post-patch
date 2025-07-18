import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from "./form/form.component";
import { PostsComponent } from "./posts/posts.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormComponent, PostsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'httpmethods';
}
