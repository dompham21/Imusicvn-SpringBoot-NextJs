import { Box } from "@chakra-ui/layout";
import { Swiper, SwiperSlide  } from 'swiper/react';
import SwiperCore, {Navigation} from 'swiper';
import PlaylistItem from "./PlaylistItem";

const Playlist = (props) => {
    const { title, songs, playlists } = props;
    SwiperCore.use([Navigation]);

   
    return (
        <section className="playlist-section">
            <div className="container">
                <h3 className="title">{title}</h3>
                <Box>
                    <Swiper
                        className="swiper-container swiper-playlist"
                        slidesPerGroup={6}
                        slidesPerView={6}
                        spaceBetween={30}
                        navigation={songs.length <=6 ? false : true}
                        allowTouchMove={false}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                slidesPerGroup: 1,
                            },
                            480: {
                                slidesPerView: 2,
                                slidesPerGroup: 2,
                                spaceBetween: 24
                            },
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 3,
                                slidesPerGroup: 3,
                                spaceBetween: 24
                            },
                            // when window width is >= 768px
                            768: {
                                slidesPerView: 4,
                                slidesPerGroup: 4,
                                spaceBetween: 24
                            },
                            991: {
                                slidesPerView: 5,
                                slidesPerGroup: 5,
                                spaceBetween: 24
                            },
                            1199: {
                                slidesPerView: 6,
                                slidesPerGroup: 6,
                                spaceBetween: 30
                            }
                        }}
                    >
                        {songs && songs.map(track => {
                        return (
                           <SwiperSlide className="swiper-slide swiper-slide-playlist" key={track.id}>
                                
                                <PlaylistItem {...track} />
                            </SwiperSlide>  
                        )} 
                        )}
                        {
                            playlists && playlists.map(item => {
                                return (
                                    <SwiperSlide className="swiper-slide swiper-slide-playlist" key={item.id}>
                                        <PlaylistItem {...item} />
                                    </SwiperSlide>  
                                )
                            })
                        }                     
                    </Swiper>   
                </Box>
            </div>
        </section>
    )
}

export default Playlist;