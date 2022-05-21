import {
  // HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline'
import {
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid'
import { useSession } from 'next-auth/client'
import { debounce } from 'lodash'
import React, { useEffect, useState, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../lib/useSongInfo'

function Player() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)
  const songInfo = useSongInfo()
  console.log(songInfo)
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('now playing: ', data.body?.item)
        setCurrentTrackId(data.body?.item?.id)
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetch the song info
      fetchCurrentSong()
      setVolume(50)
    }
  }, [spotifyApi, currentTrackIdState, session])
  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])
  const debouncedAdjustVolume = useCallback(
    debounce(
      (volume) => {
        spotifyApi.setVolume(volume).catch((err) => {})
      },
      400,
      []
    )
  )
  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8 md:text-base">
      {/* left side */}
      <div className="flex items-center space-x-4">
        <img
          src={songInfo?.album?.images?.[0].url}
          alt=""
          className="hidden h-10 w-10 md:inline"
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* center */}
      <div className="flex items-center justify-evenly ">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button h-10 w-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button h-10 w-10" />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
      {/* right side  */}
      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeDownIcon
          className="button"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          type="range"
          min={0}
          max={100}
          className="w-14 md:w-28"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          className="button"
          onClick={() => volume < 100 && setVolume(volume + 10)}
        />
      </div>
    </div>
  )
}

export default Player
