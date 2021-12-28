package com.luv2code.imusic.controller;

import com.luv2code.imusic.entity.Category;
import com.luv2code.imusic.entity.customInterface.CategoryIdName;
import com.luv2code.imusic.exception.CategoryNotFoundException;
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

@RestController
@CrossOrigin
public class CategoryController {
    private final Logger log = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    private CategoryService categoryService;
    @Autowired
    private SongService songService;
    @Autowired
    private StorageService storageService;

    @PostMapping( "/api/category/add")
    public ResponseEntity<String> addCategory(HttpServletRequest req,
                                              @RequestParam("photo") MultipartFile photoFile) {
        String name = req.getParameter("name").trim();
        String introduction = req.getParameter("introduction").trim();
        Boolean status = Boolean.valueOf(req.getParameter("status"));
        if (photoFile.isEmpty()) {
            return new ResponseEntity<String>("Url song is empty", HttpStatus.BAD_REQUEST);
        }
        try {
            String categoryPhoto = storageService.uploadFile(photoFile);

            Category category = new Category();
            category.setName(name);
            category.setIntroduction(introduction);
            category.setEnabled(status);
            category.setPhoto(categoryPhoto);

            boolean res = categoryService.addCategory(category);
            if (res) {
                log.info("success");
                return new ResponseEntity<String>("Created category is successfully", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<String>("Saved category is fail", HttpStatus.BAD_REQUEST);
            }
        }
        catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/api/category/page/{pageNum}")
    public Map<String, Object> getListCategoryByPage(@PathVariable(name = "pageNum") Integer pageNum,
                                                    @RequestParam(required = false) String keyword) {
        Map<String, Object> response = new HashMap<>();
        Page<Category> page = categoryService.listByPage(pageNum, keyword);
        List<Category> listCategories = page.getContent();
        response.put("listCategories", listCategories);
        response.put("totalCategory", categoryService.getTotalCategory());
        response.put("status", HttpStatus.OK);
        return response;
    }

    @GetMapping("/api/category/{id}")
    public HttpEntity<? extends Object> getCategoryById(@PathVariable(name = "id") Integer id) {
        try {
            Category category = categoryService.get(id);
            return new ResponseEntity<Category>(category,HttpStatus.OK);
        }
        catch (CategoryNotFoundException e) {
            return new ResponseEntity<String>("Could not find any category with ID " + id, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping( "/api/category/edit/{id}")
    public ResponseEntity<String> editGallery(@PathVariable(name = "id") Integer id, HttpServletRequest req,
                                              @RequestParam(value = "photo", required = false) MultipartFile photoFile)
            throws CategoryNotFoundException {

        String name = req.getParameter("name").trim();
        Boolean status = Boolean.valueOf(req.getParameter("status"));

        String introduction = req.getParameter("introduction").trim();
        Category existCategory = categoryService.get(id);



        try {
            if(photoFile != null ) {
                String playlistPhoto = storageService.uploadFile(photoFile);
                existCategory.setPhoto(playlistPhoto);
            }


            existCategory.setName(name);
            existCategory.setIntroduction(introduction);

            boolean res = categoryService.addCategory(existCategory);
            if (res) {
                log.info("success");
                return new ResponseEntity<String>("Updated category is successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("Updated category is fail", HttpStatus.BAD_REQUEST);
            }
        }
        catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/api/category/delete/{id}")
    public ResponseEntity<String> deleteCategoryById(@PathVariable(name = "id") Integer id) throws CategoryNotFoundException {
        try {
            categoryService.delete(id);
            return new ResponseEntity<String>("Deleted song is successfully",HttpStatus.OK);
        }
        catch (CategoryNotFoundException ex) {
            return new ResponseEntity<String>("Deleted song is fail",HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/api/category/getlist")
    public ResponseEntity<? extends Object> getListIdPlaylist() {
        List<CategoryIdName> listCategories = categoryService.listCategory();
        return new ResponseEntity<List<CategoryIdName>>(listCategories,HttpStatus.OK);
    }
}
