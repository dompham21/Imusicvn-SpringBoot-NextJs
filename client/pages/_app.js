import { ChakraProvider } from '@chakra-ui/react'
import Router from 'next/router'
import NProgress from 'nprogress'
import { wrapper } from "../store";
import DefaultLayout from '../components/layouts/main';
import { useEffect } from 'react';
import { isEmptyObject } from '../utils/utils';
import { getLocalStorage } from '../utils/useLocalStorage';
import '../components/Gallery/Gallery.css'
import '../components/GridPlaylist/Playlist.css'
import '../styles/globals.css';
import '../components/PlaylistChart/PlaylistChart.css'
import '../components/PlaylistChart/Chart.css'
import '../components/Player/Player.css'
import '../components/QueueDrawer/QueueDrawer.css'
import 'antd/dist/antd.css';

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => NProgress.done())

Router.events.on('routeChangeError', () => NProgress.done())

function Website({ Component, pageProps, router }) {
  const Layout = Component.Layout || DefaultLayout;
  
  useEffect(() => {
  
    !localStorage.getItem('imusic_player') && localStorage.setItem('imusic_player',JSON.stringify({
      beforeMuteVolume: 1
    }));

    !localStorage.getItem('imusic_currSongInfo') && localStorage.setItem('imusic_currSongInfo',JSON.stringify({}))

    !localStorage.getItem('imusic_history') && localStorage.setItem('imusic_history',JSON.stringify({
      history: [],
      indexCurr: 0
    }));

    !localStorage.getItem('imusic_defaultVolume') && localStorage.setItem('imusic_defaultVolume','1')
    !localStorage.getItem('imusic_suggested') && localStorage.setItem('imusic_suggested', JSON.stringify([]))
    let checkHasSong = isEmptyObject(getLocalStorage('imusic_currSongInfo', {}))
    !localStorage.getItem('imusic_hasPlayer') && localStorage.setItem('imusic_hasPlayer', !checkHasSong)

}, [])
  return (
    <ChakraProvider>
      <Layout router={router}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </ChakraProvider>
  )
}

export default wrapper.withRedux(Website)