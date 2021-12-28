package com.luv2code.imusic.entity.customInterface;


import com.luv2code.imusic.entity.Artist;
import com.luv2code.imusic.entity.Category;

import java.util.Date;
import java.util.Set;

public interface SongNotUrl {

     Integer getId();

     String getName();

     String getIntroduction();

     Date getCreateTime();

     Date getUpdateTime();

     String getPhoto();

     String getLyric();

     boolean isEnabled();

     Set<Artist> getArtists();

     Set<Category> getCategories();
}
