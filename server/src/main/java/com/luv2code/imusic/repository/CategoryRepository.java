package com.luv2code.imusic.repository;


import com.luv2code.imusic.entity.Category;
import com.luv2code.imusic.entity.customInterface.CategoryIdName;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends PagingAndSortingRepository<Category, Integer> {
    @Query("SELECT p FROM Category p WHERE p.name LIKE %?1% OR p.introduction LIKE %?1%")
    public Page<Category> findAll(@Param("keyword") String keyword, Pageable pageable);

    public Long countById(Integer id);

    @Query("SELECT p From Category p")
    public List<CategoryIdName> findListPlaylistId();
}
