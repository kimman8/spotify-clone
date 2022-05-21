import React, { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import { useSession, signIn } from 'next-auth/react'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

function useSpotify() {
  const { data: session, status } = useSession()
  useEffect(() => {
    if (session) {
      // if refresh access token attempt fails, redirect user to login..
      if (session.error === 'RefreshAccessTokenError') {
        signIn()
      }
      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session])
  return spotifyApi
}

export default useSpotify
