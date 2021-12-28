package com.luv2code.imusic.repository;

import com.luv2code.imusic.entity.Artist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtistRepository extends PagingAndSortingRepository<Artist, Integer> {
    @Query("UPDATE Artist a SET a.enabled = ?2 WHERE a.id = ?1")
    @Modifying
    public void updateEnabledStatus(Integer id, boolean enabled);

    @Query("SELECT a FROM Artist a WHERE a.name LIKE %?1% OR a.introduction LIKE %?1% OR a.realName LIKE %?1%")
    public Page<Artist> findAll(@Param("keyword") String keyword, Pageable pageable);

    public Artist findByName(String name);

    public Long countById(Integer id);


    @Query("SELECT a FROM Artist a")
    public List<Artist> findListArtists();

}
