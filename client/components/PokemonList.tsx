import { useQuery } from '@tanstack/react-query'
import { Pokemon } from '../../models/pokemon.ts'
import PokemonListItem from './PokemonListItem.tsx'
import { getAllPokemon } from '../apis/pokemon.ts'
import LoadingSpinner from './LoadingSpinner.tsx'

export default function PokemonList() {
  const { data: pokemonList, isError, isLoading } = useQuery(['pokemon'], getAllPokemon)

  if (isError) {
    return <div>There was an error trying to get your pokemon</div>
  }

  if (!pokemonList || isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <h2>Pokemon List</h2>
      {pokemonList.map((p) => (
        <PokemonListItem key={p.id} id={p.id} name={p.name} />
      ))}
    </div>
  )
}
