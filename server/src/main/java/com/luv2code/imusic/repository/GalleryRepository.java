package com.luv2code.imusic.repository;

import com.luv2code.imusic.entity.Gallery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends PagingAndSortingRepository<Gallery, Integer> {

    @Query("SELECT g FROM Gallery g WHERE g.title LIKE %?1% OR g.sectionType LIKE %?1% " +
            "ORDER BY case when g.sectionType = 'banner' then 0 else 1 end, g.sectionType desc")
    public Page<Gallery> findAll(@Param("keyword") String keyword, Pageable pageable);

    public Long countById(Integer id);

}
