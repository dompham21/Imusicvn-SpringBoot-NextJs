import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import dynamic from 'next/dynamic';


const DynamicSidebar = dynamic(() => import('../Sidebar/Sidebar'),
  { ssr: false }
)
const DynamicNavbar = dynamic(() => import('../Navbar/Navbar'),
  { ssr: false }
)
const DynamicPlayer = dynamic(() => import('../Player/Player'))

const Main = ({ children, router }) => {
  return (
    <Box as="main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="iMusic homepage" />
        <meta name="author" content="Dom Pham" />
        <meta property="og:site_name" content="iMusic Homepage" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="16x16" />
        
        <title>iMusic - Homepage</title>
        <link
            rel="stylesheet"
            href="https://unpkg.com/swiper@7/swiper-bundle.min.css"
        /> 
        <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
      </Head>


      <Container maxW="100vw" maxH="100vh" p={0} overflow={"auto"}>
        <DynamicSidebar>
            <DynamicNavbar/>
            <Box
                color={'white'}
            >
              {children}
              <DynamicPlayer/>
            </Box>

        </DynamicSidebar>
      </Container>
    </Box>
  )
}

export default Main