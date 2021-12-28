package com.luv2code.imusic.repository;
import com.luv2code.imusic.entity.Song;

import com.luv2code.imusic.entity.customInterface.SongIdName;
import com.luv2code.imusic.entity.customInterface.SongNotUrl;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface SongRepository extends PagingAndSortingRepository<Song, Integer> {

    @Query("UPDATE Song s SET s.enabled = ?2 WHERE s.id = ?1")
    @Modifying
    public void updateEnabledStatus(Integer id, boolean enabled);

    @Query("SELECT s FROM Song s WHERE s.name LIKE %?1% OR s.introduction LIKE %?1%")
    public Page<SongNotUrl> findAll(@Param("keyword") String keyword, Pageable pageable);


    public Song findByName(String name);


    public Long countById(Integer id);


    @Query("SELECT s FROM Song s JOIN s.artists a JOIN s.categories c WHERE  (s.id NOT IN :list) AND " +
            "(a.id IN :listIdArtist OR  c.id IN :listIdCategory)")
    public List<SongNotUrl> findSongSuggested(List<Integer> listIdArtist, List<Integer> listIdCategory, List<Integer> list, Pageable pageable);

    @Query("SELECT s FROM Song s")
    public List<SongIdName> findListSongsId();


}
