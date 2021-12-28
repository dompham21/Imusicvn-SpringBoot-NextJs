package com.luv2code.imusic.service;

import com.luv2code.imusic.entity.Gallery;

import com.luv2code.imusic.exception.GalleryNotFoundException;
import com.luv2code.imusic.repository.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class GalleryService {
    public static final int GALLERY_PER_PAGE = 9;

    @Autowired
    private GalleryRepository galleryRepository;

    public boolean addGallery(Gallery gallery) {
        galleryRepository.save(gallery);
        return true;
    }
    public Page<Gallery> listByPage(Integer pageNum, String keyword) {
        Pageable pageable = PageRequest.of(pageNum - 1, GALLERY_PER_PAGE);
        if(keyword != null) {
            return galleryRepository.findAll(keyword, pageable);
        }

        return galleryRepository.findAll("",pageable);
    }

    public long getTotalGallery() {
        return galleryRepository.count();
    }

    public Gallery get(Integer id) throws GalleryNotFoundException {
        try {
            return galleryRepository.findById(id).get();
        } catch (NoSuchElementException ex) {
            throw new GalleryNotFoundException("Could not find any song with ID " + id);
        }
    }

    public void delete(Integer id) throws GalleryNotFoundException {
        Long countById = galleryRepository.countById(id);
        if (countById == null || countById == 0) {
            throw new GalleryNotFoundException("Could not find any song with ID " + id);
        }
        galleryRepository.deleteById(id);


    }
}
