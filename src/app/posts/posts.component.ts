import { Component ,OnInit} from '@angular/core';
import { SignupserviceService } from '../signupservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  searchCategory = '';

  constructor(private postService : PostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  getUserName() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.name || 'Guest';
  }

  fetchPosts() {
    this.postService.getPosts().subscribe({
      next: data => {
        this.posts = data;
        this.filteredPosts = data;
      },
      error: err => console.error('Error loading posts', err)
    });
  }

  filterPosts() {
    const query = this.searchCategory.toLowerCase();
    this.filteredPosts = this.posts.filter(post =>
      post.category.toLowerCase().includes(query)
    );
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe({
      next: () => this.fetchPosts(),
      error: err => console.error('Delete failed', err)
    });
  }

  fullUpdatePost(post: any) {
    const updatedPost = {
  id: 5,
  name: 'Updated Product Name',
  category: 'Updated Category',
  price: 2999,
  description: 'This is the updated description for the product.',
  image: 'https://example.com/images/updated-product.jpg',
  title: 'Updated Title'
};


    this.postService.updatePost(post.id, updatedPost).subscribe({
      next: () => this.fetchPosts(),
      error: err => console.error('Update failed', err)
    });
  }

  partialUpdatePost(post: any) {
    this.postService.patchPost(post.id, { price: post.price + 100 }).subscribe({
      next: () => this.fetchPosts(),
      error: err => console.error('Patch failed', err)
    });
  }

  showPostWithAuthor(id: number) {
    this.postService.getPostWithAuthor(id).subscribe({
      next: data => console.log('Post with author:', data),
      error: err => console.error('SwitchMap failed', err)
    });
  }
  
}
