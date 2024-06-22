import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie';
import { map } from 'rxjs';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [HttpClientModule,
    ReactiveFormsModule,
    NgFor,
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

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.mode = params.get('mode');
      this.id = params.get('id');
    })

    if (this.mode == 'UPD'){
      this.getMovieById();
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
  
  public createMovie(){    
    
    this.http.post('http://localhost:3000/movies/',this.movieForm.value).subscribe({
      next: (res) => {console.log('Movie creada con éxito.')},
      
      error: (err) => {console.error('Error al crear Movie',err)},

      complete: () => {console.log('createMovie complete')}
    })
  }
}
