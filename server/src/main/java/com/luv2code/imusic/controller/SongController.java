package com.luv2code.imusic.controller;


import com.luv2code.imusic.entity.Artist;
import com.luv2code.imusic.entity.Category;
import com.luv2code.imusic.entity.Song;
import com.luv2code.imusic.entity.customInterface.SongIdName;
import com.luv2code.imusic.entity.customInterface.SongNotUrl;
import com.luv2code.imusic.exception.SongNotFoundException;
import com.luv2code.imusic.service.ArtistService;
import com.luv2code.imusic.service.CategoryService;
import com.luv2code.imusic.service.SongService;
import com.luv2code.imusic.service.StorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class SongController {
    private final Logger log = LoggerFactory.getLogger(SongController.class);

    @Autowired
    private SongService songService;

    @Autowired
    private StorageService storageService;

    @Autowired
    private ArtistService artistService;

    @Autowired
    private CategoryService categoryService;


    @PostMapping( "/api/song/add")
    public ResponseEntity<String> addSong(HttpServletRequest req, @RequestParam(value = "file") MultipartFile mpfile,
                                        @RequestParam(value = "photo")  MultipartFile photoFile) {

        String artist_id = req.getParameter("artist").trim();
        String category_id = req.getParameter("categories").trim();
        log.info(req.getParameter("artist"));
        String name = req.getParameter("name").trim();
        String introduction = req.getParameter("introduction").trim();
        Boolean status = Boolean.valueOf(req.getParameter("status"));
        log.info(mpfile.toString());
        if (mpfile.isEmpty()) {
            return new ResponseEntity<String>("Url song is empty", HttpStatus.BAD_REQUEST);
        }

        try {


            String songUrl = storageService.uploadFile(mpfile);
            String songPhoto = storageService.uploadFile(photoFile);

            Song song = new Song();
            if(artist_id.length() > 0) {
                for(String i: artist_id.split(",")) {
                    Artist artist = artistService.get(Integer.parseInt(i));
                    song.addArtist(artist);
                }
            }
            else {
                song.setArtists(null);
            }

            if(category_id.length() > 0) {
                for(String i: category_id.split(",")) {
                    Category category = categoryService.get(Integer.parseInt(i));
                    song.addCategory(category);
                }
            }
            else {
                song.setCategories(null);
            }

            song.setName(name);
            song.setIntroduction(introduction);
            song.setCreateTime(new Date());
            song.setUpdateTime(new Date());
            song.setPhoto(songPhoto);
            song.setLyric("");
            song.setEnabled(status);
            song.setUrl(songUrl);
            log.info(song.toString());
            boolean res = songService.addSong(song);
            if (res) {
                log.info("success");
                return new ResponseEntity<String>("Created song is successfully", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<String>("Saved song is fail", HttpStatus.BAD_REQUEST);
            }
        }
        catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/api/song/page/{pageNum}")
    public Map<String, Object> getListSongByPage(@PathVariable(name = "pageNum") Integer pageNum,
                                                    @RequestParam(required = false) String keyword,
                                                    @RequestParam(required = false) Integer num) {
        Map<String, Object> response = new HashMap<>();
        Page<SongNotUrl> page = songService.listByPage(pageNum, keyword, num);
        List<SongNotUrl> listSongs = page.getContent();
        response.put("listSongs", listSongs);
        response.put("totalSongs", songService.getTotalSongs());
        response.put("status", HttpStatus.OK);
        return response;
    }

    @GetMapping("/api/song/{id}")
    public HttpEntity<? extends Object> getSongById(@PathVariable(name = "id") Integer id) {
        log.info("Song id is: " + id);
        try {
            Song song = songService.get(id);
            return new ResponseEntity<Song>(song,HttpStatus.OK);
        }
        catch (SongNotFoundException e) {
            return new ResponseEntity<String>("Could not find any song with ID " + id, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping( "/api/song/edit/{id}")
    public ResponseEntity<String> editSong(@PathVariable(name = "id") Integer id, HttpServletRequest req, @RequestParam(value = "file", required = false) MultipartFile mpfile,
                                          @RequestParam(value = "photo", required = false) MultipartFile photoFile) throws SongNotFoundException {

        String name = req.getParameter("name").trim();
        String artist_id = req.getParameter("artist").trim();
        String category_id = req.getParameter("categories").trim();

        Boolean status = Boolean.valueOf(req.getParameter("status"));

        String introduction = req.getParameter("introduction").trim();
        Song existSong = songService.get(id);

        try {
            if(photoFile != null ) {
                String songPhoto = storageService.uploadFile(photoFile);
                existSong.setPhoto(songPhoto);
            }

            if(mpfile != null) {
                System.out.println(mpfile.toString());
                String songUrl = storageService.uploadFile(mpfile);
                existSong.setUrl(songUrl);
            }
            if(artist_id.length() > 0) {
                existSong.setArtists(new HashSet<>());

                for(String i: artist_id.split(",")) {
                    Artist artist =  artistService.get(Integer.parseInt(i));
                    existSong.addArtist(artist);
                }
            }
            else {
                existSong.setArtists(new HashSet<>());
            }
            if(category_id.length() > 0) {
                existSong.setCategories(new HashSet<>());

                for(String i: category_id.split(",")) {
                    Category category =  categoryService.get(Integer.parseInt(i));
                    existSong.addCategory(category);
                }
            }
            else {
                existSong.setCategories(new HashSet<>());
            }

            existSong.setName(name);
            existSong.setIntroduction(introduction);
            existSong.setUpdateTime(new Date());
            existSong.setLyric("");
            existSong.setEnabled(status);
            log.info(existSong.toString());
            boolean res = songService.addSong(existSong);
            if (res) {
                log.info("success");
                return new ResponseEntity<String>("Updated song is successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("Updated song is fail", HttpStatus.BAD_REQUEST);
            }
        }
        catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/api/song/delete/{id}")
    public ResponseEntity<String> deleteSongById(@PathVariable(name = "id") Integer id) throws SongNotFoundException {
        try {
            songService.delete(id);
            return new ResponseEntity<String>("Deleted song is successfully",HttpStatus.OK);
        }
        catch (SongNotFoundException ex) {
            return new ResponseEntity<String>("Deleted song is fail",HttpStatus.BAD_REQUEST);
        }

    }
    @GetMapping("/api/song/suggested/{id}")
    public ResponseEntity<? extends Object> getSongSuggested(@RequestParam(name = "ids") String ids,
                                                @PathVariable(name = "id") Integer id) {
        List<Integer> list = new ArrayList<>();
        list.add(id);
        if(ids.length() > 0) {
            list.addAll(Arrays.asList(ids.split(",")).stream().map(s -> Integer.parseInt(s.trim())).collect(Collectors.toList()));
        }
        else {
            list.add(-1);
        }

        try {
            Song song = songService.get(id);
            List<Integer> listIdArtist = new ArrayList<>();
            List<Integer> listIdCategory = new ArrayList<>();

            Set<Artist> listArtists =  song.getArtists();
            Set<Category> listCategories =  song.getCategories();

            for(Artist a : listArtists) {
                listIdArtist.add(a.getId());
            }

            for(Category c : listCategories) {
                listIdCategory.add(c.getId());
            }
            List<SongNotUrl> suggestSongs = songService.getSongSuggested(listIdArtist,listIdCategory, list);
            return new ResponseEntity<List<SongNotUrl>>(suggestSongs,HttpStatus.OK);
        }
        catch (SongNotFoundException ex) {
            return new ResponseEntity<String>("Can't find this song", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/api/song/getlist")
    public ResponseEntity<? extends Object> getListArtist() {
        List<SongIdName> listSongs = songService.listSongsId();
        return new ResponseEntity<List<SongIdName>>(listSongs,HttpStatus.OK);
    }



}