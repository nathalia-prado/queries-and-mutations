import { useState } from 'react'
import styles from './PokemonListItem.module.css'
import { deletePokemon, renamePokemon } from '../apis/pokemon.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
  id: number
  name: string
}
export default function PokemonListItem({ id, name }: Props) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(name)
  const queryClient = useQueryClient()

  const handleDeleteClick = () => {
    // TODO: submit the form to delete the pokemon
    console.log('deleting', id)
    pokemonMutationDelete.mutate({id})
  }

  const pokemonMutationDelete = useMutation(deletePokemon, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['pokemon'])
    }
  })

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // TODO: submit the form to change the name
    console.log('submitting', text)
    pokemonMutationRename.mutate({id, newName: text})

    setEditing(false)
  }
  
  const pokemonMutationRename = useMutation(renamePokemon, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['pokemon'])
    }
  })


  const handleStopEditingClick = () => {
    setEditing(false)
    setText(name)
  }

  const handleStartEditingClick = () => {
    setEditing(true)
  }

  return (
    <div>
      {editing ? (
        <form onSubmit={handleEditSubmit} className={styles.form}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleStopEditingClick}>
            Stop Editing
          </button>
        </form>
      ) : (
        <p>
          {id} - {name} -{' '}
          <span className={styles.buttons}>
            <button onClick={handleStartEditingClick}>Rename</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </span>
        </p>
      )}
    </div>
  )
}
