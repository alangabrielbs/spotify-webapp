import React from 'react'
import { useEffect } from 'react'
import { useStateProvider } from '../../contexts/StateProvider'
import axios from 'axios'
import { reducerCases } from '../../utils/constants/index'

import { Container } from './styles'
import { parseCookies } from 'nookies'

export default function Playlists() {
  const { ['@token']: token } = parseCookies()

  const [{ playlists }, dispatch] = useStateProvider()

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })

      const { items } = response.data
      const playlists = items.map(({ name, id }) => {
        return { name, id }
      })
      // console.log(playlists);
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists })
    }

    getPlaylistData()
  }, [token, dispatch])
  return (
    <Container>
      <div>
        <ul>
          {playlists.map(({ name, id }) => {
            return <li key={id}>{name} </li>
          })}
        </ul>
      </div>
    </Container>
  )
}
