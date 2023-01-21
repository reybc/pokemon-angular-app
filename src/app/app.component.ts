import {Component, OnInit} from '@angular/core';
import {IPokemonList} from "./models/pokemon.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'defontana-test';
  details = false;
  selectedPokemon: IPokemonList | any;

  ngOnInit() {
  }

  pokemonSelectionChange(pokemon: IPokemonList) {
    console.log(pokemon);
    this.details = !!pokemon;
    this.selectedPokemon = pokemon;
  }
}
