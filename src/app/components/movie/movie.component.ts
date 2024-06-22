import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Movie } from '../../models/movie';
import { map } from 'rxjs';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [HttpClientModule,
    ReactiveFormsModule,
    NgFor,
    RouterModule,
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit{
  mode: any;
  id: any;
  movie: any; // -> aca guardo la movie que encontró la consulta a la API
  aMovie!: Movie;
  movieForm!: FormGroup;
  aux!: any[];
  titulo!: string;

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.mode = params.get('mode');
      this.id = params.get('id');
    })

    if (this.mode == 'UPD'){
      this.getMovieById();
      this.titulo = 'MODIFICAR PELÍCULA'
    }else{
      this.titulo = 'NUEVA PELÍCULA'
    }

    this.movieForm = this.formBuilder.group({
      title: new FormControl('',Validators.required),
      director: new FormControl('',Validators.required),
      year: new FormControl(0,Validators.required)
    });
  }

  public getMovieById(){
    this.http.get<Movie[]>(`http://localhost:3000/movies/${this.id}`).subscribe({
      next: (res) => {
        this.movie = res;
        this.aMovie = res[0];
        this.movieForm.setValue({
          title: this.aMovie.title,
          director: this.aMovie.director,
          year: this.aMovie.year
        })
      },

      error: (err) => {console.error('Error al obtener Movie', err)},

      complete: () => {console.log('getMovieById complete')}
    })
  }
  
  public submitMovie(){    
    
    console.log(`${this.id} - ${this.mode}`)
    
    if (this.mode == 'INS'){
      this.http.post('http://localhost:3000/movies/',this.movieForm.value).subscribe({
        next: (res) => {console.log('Movie creada con éxito.')},
        
        error: (err) => {console.error('Error al crear Movie',err)},
  
        complete: () => {
          console.log('createMovie complete');
          this.router.navigate(['/all-movies']); 
        }
      })
    }else{
      this.http.put(`http://localhost:3000/movies/${this.id}`,this.movieForm.value).subscribe({
        next: (res) => {console.log('Movie actualizada con éxito.')},
        
        error: (err) => {console.error('Error al actualizar Movie',err)},
  
        complete: () => {
          console.log('submitMovie complete');
          this.router.navigate(['/all-movies']); 
        }
      })
    }
  }
}
