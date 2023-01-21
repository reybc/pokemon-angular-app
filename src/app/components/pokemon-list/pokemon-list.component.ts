import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {PokemonService} from "../../services/pokemon.service";
import {IPokemonList} from "../../models/pokemon.model";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  displayedColumns: string[] = ['name', 'url'];
  pokemons: IPokemonList[] | any = [];
  selectedPokemon: IPokemonList | null = null;
  count = 0;
  isLoading = false;
  pageSize = 20;
  currentPage = 0;
  dataSource = new MatTableDataSource<IPokemonList>(this.pokemons);
  myControl = new FormControl('');
  filteredOptions = new Observable<IPokemonList[]>;
  filterValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  @Output() pokemonChange = new EventEmitter<IPokemonList>();

  constructor(private _pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getPokemons();
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
    // this.filteredOptions.subscribe(value => {
    //   console.log(value);
    //   if (value.length > 0) {
    //     this.dataSource.filter = value[0].name.trim().toLowerCase();
    //     if (this.dataSource.paginator) {
    //       this.dataSource.paginator.firstPage();
    //     }
    //   }
    // });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getPokemons() {
    this.isLoading = true;
    const options = {
      offset: this.pageSize * this.currentPage,
      limit: this.pageSize,
    }
    this._pokemonService.getPokemons(options).subscribe(value => {
      console.log(value);
      this.pokemons = value.results;
      this.count = value.count;
      this.dataSource = new MatTableDataSource<IPokemonList>(value.results);
      this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = value.count;
      }, 1000);
        this.isLoading = false;
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    // this.pokemons = this.dataSource.filter;
  }

  getRow(row: IPokemonList) {
    console.log(row);
    console.log(this.selectedPokemon);
    this.pokemonChange.emit(row);
  }

  changePaginator(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getPokemons();
    this.pokemonChange.emit();
  }

  private _filter(value: string): IPokemonList[] {
    console.log(value);
    const filterValue = value.toLowerCase();

    return this.pokemons.filter((option: { name: string; }) => option.name.toLowerCase().includes(filterValue));
  }
}
