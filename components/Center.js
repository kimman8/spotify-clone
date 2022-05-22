import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { playlistState, playlistIdState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'
import Image from 'next/image'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

function Center() {
  const { data: session } = useSession()
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [color, setColor] = useState(null)
  const spotifyApi = useSpotify()

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => console.log('somethin went wrong!', err))
  }, [spotifyApi, playlistId])
  console.log(playlist)
  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-3 text-white opacity-90 hover:opacity-80 "
          onClick={signOut}
        >
          <Image
            className="h-10 w-10 rounded-full"
            src={session?.user.image}
            alt=""
            width={250}
            height={250}
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex h-80 items-end  space-x-7 bg-gradient-to-b p-8 ${color} to-black text-white`}
      >
        <Image
          src={playlist?.images?.[0].url}
          alt=""
          className=" h-44 w-44 shadow-2xl"
          width={250}
          height={250}
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <Songs />
    </div>
  )
}

export default Center
