package com.luv2code.imusic.service;

import com.luv2code.imusic.entity.Category;
import com.luv2code.imusic.entity.customInterface.CategoryIdName;
import com.luv2code.imusic.exception.CategoryNotFoundException;
import com.luv2code.imusic.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CategoryService {
    public static final int PLAYLIST_PER_PAGE = 9;

    @Autowired
    private CategoryRepository categoryRepository;

    public boolean addCategory(Category category) {
        categoryRepository.save(category);
        return true;
    }
    public Page<Category> listByPage(Integer pageNum, String keyword) {
        Pageable pageable = PageRequest.of(pageNum - 1, PLAYLIST_PER_PAGE);
        if(keyword != null) {
            return categoryRepository.findAll(keyword, pageable);
        }

        return categoryRepository.findAll("",pageable);
    }

    public long getTotalCategory() {
        return categoryRepository.count();
    }

    public Category get(Integer id) throws CategoryNotFoundException {
        try {
            return categoryRepository.findById(id).get();
        } catch (NoSuchElementException ex) {
            throw new CategoryNotFoundException("Could not find any song with ID " + id);
        }
    }

    public void delete(Integer id) throws CategoryNotFoundException {
        Long countById = categoryRepository.countById(id);
        if (countById == null || countById == 0) {
            throw new CategoryNotFoundException("Could not find any song with ID " + id);
        }
        categoryRepository.deleteById(id);
    }
    public List<CategoryIdName> listCategory() {
        return categoryRepository.findListPlaylistId();
    }

}
