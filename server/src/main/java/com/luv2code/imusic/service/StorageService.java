package com.luv2code.imusic.service;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
public class StorageService {
    @Autowired
    private Cloudinary cloudinary;


    public String uploadFile(MultipartFile multipartFile) throws IOException {
        File file = convert(multipartFile);
        System.out.println(file.getName());
        Map uploadParams = new HashMap();
        uploadParams.put("resource_type", "auto");

        Map result = cloudinary.uploader().upload(file, uploadParams);

        file.delete();
        return result.get("url").toString();
    }

    private File convert(MultipartFile multipartFile) throws IOException {
        File file = new File(Objects.requireNonNull(multipartFile.getOriginalFilename()));
        FileOutputStream fo = new FileOutputStream(file);
        fo.write(multipartFile.getBytes());
        fo.close();
        return file;
    }
}