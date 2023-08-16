package com.imageuploding.image.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

import javax.imageio.ImageIO;
import java.io.ByteArrayInputStream;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.imageuploding.image.service.ImageService;



@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImages(@RequestParam("files") List<MultipartFile> files) {
        try {
            imageService.uploadImages(files);
            return ResponseEntity.status(HttpStatus.CREATED).body("Images uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading images.");
        }
    }
    
    
    @GetMapping("/all")
    public ResponseEntity<List<String>> getAllImages() {
        List<String> imageFilenames = imageService.getAllImageFilenames();
        return ResponseEntity.status(HttpStatus.OK).body(imageFilenames);
    }
    
  

    
    @GetMapping("/view/{filename}")
    public ResponseEntity<Resource> viewImage(@PathVariable String filename) {
        Resource imageResource = imageService.getImageResource(filename);

        if (imageResource != null) {
            MediaType mediaType = MediaTypeFactory.getMediaType(imageResource).orElse(MediaType.APPLICATION_OCTET_STREAM);

            return ResponseEntity.ok()
                .contentType(mediaType)
                .body(imageResource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
}