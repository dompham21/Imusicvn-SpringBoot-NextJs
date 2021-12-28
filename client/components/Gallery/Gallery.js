import { Swiper,SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectCoverflow,Autoplay,Navigation} from 'swiper';
import { Box } from '@chakra-ui/layout';


const Gallery = (props) => {
    const { songs } = props;
    SwiperCore.use([Navigation,EffectCoverflow,Autoplay]);
    return (
        <Box p={"0 40px"} h={"300px"} w={{base: 'full'}} mt={4}>
            <Swiper
                navigation
                effect= "coverflow"
                grabCursor= {true}
                className="swiper-container swiper-gallery"
                centeredSlides= {true}
                slidesPerView= "auto"
                coverflowEffect= {{ 
                    rotate: 0,
                    stretch: 20,
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                }}
                loop={true}
                autoplay={{
                    delay:5000,
                    disableOnInteraction:false
                }}
                
            >
                {
                    songs && songs.map(track=>{
                        return (
                            <SwiperSlide className="swiper-slide swiper-slide-gallery" style={{backgroundImage:`url(${track.photo})`}} key={track.id}>
                                
                            </SwiperSlide>
                        )
                    })
                }   
            </Swiper>
        </Box>
        
    )
}

export default Gallery;