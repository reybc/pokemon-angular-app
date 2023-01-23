import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {PokemonService} from "../../services/pokemon.service";
import {IPokemonList} from "../../models/pokemon.model";
import { Observable} from "rxjs";

export interface SummaryTable {
  name: string;
  value: number;
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  displayedColumns: string[] = ['name', 'url'];
  displayedColumns2: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  pokemons: IPokemonList[] | any = [];
  allPokemons: IPokemonList[] | any = [];
  selectedPokemon: IPokemonList | null = null;
  count = 0;
  isLoading = false;
  pageSize = 20;
  currentPage = 0;
  dataSource = new MatTableDataSource<IPokemonList>(this.pokemons);
  filteredOptions = new Observable<IPokemonList[]>;
  filterValue = '';
  summaryTable: SummaryTable[] = [];
  isMobile = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() pokemonChange = new EventEmitter<IPokemonList>();

  constructor(private _pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 600;
    this.getPokemons();
    this.getAllPokemons();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPokemons() {
    this.isLoading = true;
    const options = {
      offset: this.pageSize * this.currentPage,
      limit: this.pageSize,
    }
    this._pokemonService.getPokemons(options).subscribe(value => {
      this.pokemons = value.results;
      this.count = value.count;
      this.dataSource = new MatTableDataSource<IPokemonList>(value.results);
      this.dataSource.paginator = this.paginator;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = value.count;
      }, 1000);
        this.isLoading = false;
    });
  }

  getAllPokemons () {
    console.log(this.count);
    this._pokemonService.getPokemons({offset: 0, limit: -1}).subscribe(value => {
      this.allPokemons = value.results;
      this.displayedColumns2.map(val => {
        this.summaryTable.push(this._filter(val.toLowerCase()).length);
      });
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.pokemons = this.dataSource.data.filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0);
  }

  getRow(row: IPokemonList) {
    this.pokemonChange.emit(row);
  }

  changePaginator(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getPokemons();
    this.pokemonChange.emit();
  }

  private _filter(value: string) {
    console.log(value);
    return this.allPokemons.filter((option: { name: string; }) => option.name.toLowerCase().charAt(0) === value);
  }
}
