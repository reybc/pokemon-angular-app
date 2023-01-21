import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {IPokemonList, Pokemon} from "../../models/pokemon.model";
import {PokemonService} from "../../services/pokemon.service";

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit{
  @Input() selectedPokemon: IPokemonList | any;
  pokemon: Pokemon | any;

  constructor(private _pokemonService: PokemonService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.getPokemonDetails();
  }

  ngOnInit(): void {
    console.log(this.selectedPokemon);
    // this.getPokemonDetails();
  }

  getPokemonDetails() {
    this._pokemonService.getPokemonDetails(this.selectedPokemon.name).subscribe(value => {
      this.pokemon = value;
    })
  }


}
