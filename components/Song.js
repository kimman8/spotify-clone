import Image from 'next/image'
import React from 'react'
import { useRecoilState } from 'recoil'
import { isPlayingState, currentTrackIdState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import { millisToMinutesAndSeconds } from '../lib/time'

function Song({ track, order }) {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const spotifyApi = useSpotify()
  const playSong = () => {
    setCurrentTrackId(track.track.id)
    setIsPlaying(true)
    spotifyApi.play({
      uris: [track.track.uri],
    })
  }
  return (
    <div
      className="grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4 ">
        <p className="mr-4">{order + 1}</p>
        {track?.track?.album?.images.length > 0 && (
          <Image
            className="h-10 w-10"
            src={track?.track?.album?.images?.[0]?.url}
            alt=""
            width={40}
            height={40}
            layout="fixed"
          />
        )}

        <div>
          <p className="w-36 truncate text-white lg:w-64">{track.track.name}</p>
          <p className="w-40 ">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
