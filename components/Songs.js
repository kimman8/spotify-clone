import React from 'react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilValue, useRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import { playlistState } from '../atoms/playlistAtom'
import { useEffect } from 'react'
import Song from './Song'

function Songs() {
  const { data: session } = useSession()
  const playlist = useRecoilValue(playlistState)

  const spotifyApi = useSpotify()
  console.log(playlist)
  return (
    <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
      {playlist?.tracks.items.map((track, i) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  )
}

export default Songs
