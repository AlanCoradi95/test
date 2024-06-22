import { Routes } from '@angular/router';
import { AllMoviesComponent } from './components/all-movies/all-movies.component';
import { MovieComponent } from './components/movie/movie.component';

export const routes: Routes = [
    
    {path: 'all-movies', component: AllMoviesComponent},
    {path: 'movie', component: MovieComponent},

];
