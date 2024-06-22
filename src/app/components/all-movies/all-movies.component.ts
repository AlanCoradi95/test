import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-movies',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './all-movies.component.html',
  styleUrl: './all-movies.component.css'
})

export class AllMoviesComponent implements OnInit{

  movies: any = [];

  ngOnInit(): void {
      this.getAllMovies();
  }

  constructor(private http: HttpClient){

  }

  public getAllMovies(){
    this.http.get('http://localhost:3000/movies').subscribe({
      next: res => {this.movies = res},

      error: err => {console.error('Error al obtener movies', err)},

      complete: () => {console.log('getAllMovies complete')}
    });
  }

  public deleteMovie(id: number){
    console.log(id)
    
    this.http.delete(`http://localhost:3000/movies/${id}`).subscribe({

      next: (res) => { 
        console.log('Eliminado con éxito.');
        this.ngOnInit();
      },
      error: (err) => {console.error('Error al eliminar Movie',err)},
      complete: () => {console.log('deleteMovie complete')}
    })
  }
}
