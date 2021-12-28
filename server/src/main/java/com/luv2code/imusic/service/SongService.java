package com.luv2code.imusic.service;


import com.luv2code.imusic.entity.Song;
import com.luv2code.imusic.entity.customInterface.SongIdName;
import com.luv2code.imusic.entity.customInterface.SongNotUrl;
import com.luv2code.imusic.exception.SongNotFoundException;
import com.luv2code.imusic.repository.SongRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SongService {
    public static final int SONGS_PER_PAGE = 9;
    private final Logger log = LoggerFactory.getLogger(SongService.class);

    @Autowired
    private SongRepository songRepository;

    public List<Song> listAll() {
        return (List<Song>) songRepository.findAll();
    }

    public boolean addSong(Song song) {
        songRepository.save(song);
        return true;
    }

    public String checkUnique(Integer id, String name) {
        Song songByName = songRepository.findByName(name);
        if (songByName != null && songByName.getId() != id) {
            return "Duplicate";
        }

        return "Ok";
    }

    public void updateSongEnabledStatus(Integer id, boolean enabled) {
        songRepository.updateEnabledStatus(id, enabled);
    }

    public void delete(Integer id) throws SongNotFoundException {
        Long countById = songRepository.countById(id);
        if (countById == null || countById == 0) {
            throw new SongNotFoundException("Could not find any song with ID " + id);
        }
        songRepository.deleteById(id);


    }

    public Song get(Integer id) throws SongNotFoundException {
        try {
            return songRepository.findById(id).get();
        } catch (NoSuchElementException ex) {
            throw new SongNotFoundException("Could not find any song with ID " + id);
        }
    }

    public Page<SongNotUrl> listByPage(Integer pageNum, String keyword, Integer num) {
        int songPerPage = 0;
        if(num != null) {
            songPerPage = num;
        }
        else {
            songPerPage = SONGS_PER_PAGE;
        }
            Pageable pageable = PageRequest.of(pageNum - 1, songPerPage);


        if(keyword != null) {
            log.info("Keyword is:" + keyword);
            return songRepository.findAll(keyword, pageable);
        }

        return songRepository.findAll("",pageable);
    }

    public long getTotalSongs() {
        return songRepository.count();
    }

    public List<SongNotUrl> getSongSuggested(List<Integer> listIdArtist,List<Integer> listIdCategory, List<Integer> listIds) {
        Pageable pageable = PageRequest.of(0, 5);

        return songRepository.findSongSuggested(listIdArtist,listIdCategory, listIds, pageable);
    }

    public List<SongIdName> listSongsId() {
        return songRepository.findListSongsId();
    }

}
