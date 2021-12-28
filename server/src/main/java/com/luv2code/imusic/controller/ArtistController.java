package com.luv2code.imusic.controller;


import com.luv2code.imusic.entity.Artist;
import com.luv2code.imusic.exception.ArtistNotFoundException;
import com.luv2code.imusic.service.ArtistService;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class ArtistController {
    private final Logger log = LoggerFactory.getLogger(ArtistController.class);

    @Autowired
    private StorageService storageService;

    @Autowired
    private ArtistService artistService;


    @PostMapping( "/api/artist/add")
    public ResponseEntity<String> addSong(HttpServletRequest req,
                                          @RequestParam("photo") MultipartFile photoFile) {
        log.info(req.getParameter("birthday"));

        String name = req.getParameter("name").trim();
        String introduction = req.getParameter("introduction").trim();
        String birthday = req.getParameter("birthday").trim();
        String realName = req.getParameter("realName").trim();
        String nation = req.getParameter("nation").trim();

        Boolean status = Boolean.valueOf(req.getParameter("status"));
        log.info(photoFile.toString());
        if (photoFile.isEmpty()) {
            return new ResponseEntity<String>("Photo artist is empty", HttpStatus.BAD_REQUEST);
        }

        try {
            String artistPhoto = storageService.uploadFile(photoFile);
            Artist artist = new Artist();
            artist.setName(name);
            artist.setIntroduction(introduction);
            artist.setPhoto(artistPhoto);
            artist.setEnabled(status);
            artist.setRealName(realName);
            artist.setNation(nation);
            artist.setBirthday(birthday);
            log.info(artist.toString());
            boolean res = artistService.addArtist(artist);
            if (res) {
                log.info("success");
                return new ResponseEntity<String>("Created artist is successfully", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<String>("Saved artist is fail", HttpStatus.BAD_REQUEST);
            }
        }
        catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/api/artist/page/{pageNum}")
    public Map<String, Object>  getListArtistByPage(@PathVariable(name = "pageNum") Integer pageNum,
                                                   @RequestParam(required = false) String keyword) {
        log.info("Page num is: " + pageNum);
        Map<String, Object> response = new HashMap<>();
        Page<Artist> page = artistService.listByPage(pageNum, keyword);
        List<Artist> listArtists = page.getContent();

        response.put("totalArtists", artistService.getTotalArtists());
        response.put("status", HttpStatus.OK);
        response.put("listArtists", listArtists);

        return response;
    }

    @GetMapping("/api/artist/{id}")
    public HttpEntity<? extends Object> getArtistById(@PathVariable(name = "id") Integer id) {
        log.info("Artist id is: " + id);
        try {
            Artist artist = artistService.get(id);
            return new ResponseEntity<Artist>(artist,HttpStatus.OK);
        }
        catch (ArtistNotFoundException e) {
            return new ResponseEntity<String>("Could not find any song with ID " + id, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping( "/api/artist/edit/{id}")
    public ResponseEntity<String> editArtist(@PathVariable(name = "id") Integer id, HttpServletRequest req,
                                           @RequestParam(value = "photo", required = false) MultipartFile photoFile) {

        String name = req.getParameter("name").trim();
        String introduction = req.getParameter("introduction").trim();
        String nation = req.getParameter("nation").trim();
        String realName = req.getParameter("realName").trim();
        String birthday = req.getParameter("birthday").trim();


        try {
            Artist existArtist = artistService.get(id);
            Boolean status = Boolean.valueOf(req.getParameter("status"));

            if(photoFile != null ) {
                String artistPhoto = storageService.uploadFile(photoFile);
                existArtist.setPhoto(artistPhoto);

            }

            existArtist.setRealName(realName);
            existArtist.setBirthday(birthday);
            existArtist.setName(name);
            existArtist.setIntroduction(introduction);
            existArtist.setNation(nation);
            existArtist.setEnabled(status);
            log.info(existArtist.toString());
            boolean res = artistService.addArtist(existArtist);
            if (res) {
                log.info("success");
                return new ResponseEntity<String>("Updated artist is successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("Updated artist is fail", HttpStatus.BAD_REQUEST);
            }
        }
        catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/api/artist/delete/{id}")
    public ResponseEntity<String> deleteArtistById(@PathVariable(name = "id") Integer id) {
        try {
            artistService.delete(id);
            return new ResponseEntity<String>("Deleted artist is successfully",HttpStatus.OK);
        }
        catch (ArtistNotFoundException ex) {
            return new ResponseEntity<String>("Deleted artist is fail",HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/api/artist/getlist")
    public ResponseEntity<List<Artist>> getListArtist() {
        List<Artist> listArtists = artistService.listArtists();
        return new ResponseEntity<List<Artist>>(listArtists,HttpStatus.OK);
    }
}
