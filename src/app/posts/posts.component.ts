import { Component ,OnInit} from '@angular/core';
import { SignupserviceService } from '../signupservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  allPosts: any[] = [];
  filteredPosts: any[] = [];
  searchCategory: string = '';

  constructor(private signupService: SignupserviceService) {}

  ngOnInit(): void {
    this.signupService.getPosts().subscribe({
      next: (posts) => {
        this.allPosts = posts;
        this.filteredPosts = posts;
      },
      error: (err) => {
        console.error('Failed to load posts:', err);
      }
    });
  }

  filterPosts(): void {
    const search = this.searchCategory.toLowerCase();
    this.filteredPosts = this.allPosts.filter(post =>
      post.category.toLowerCase().includes(search)
    );
  }
  getUserName(): string {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user).name;
  }
  return 'Guest';
}

}
