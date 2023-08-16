package com.imageuploding.image.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.imageuploding.image.domain.Image;
import com.imageuploding.image.repository.ImageRepository;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;



@Service
public class ImageService {
	
    private static final String UPLOAD_DIR = "C:/Users/devel/Music/uploads/";

    @Autowired
    private ImageRepository imageRepository;

    public void uploadImages(List<MultipartFile> files) throws IOException {
    	
    	System.out.println("hii"+files);
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            	System.out.println("hii"+filename);
                byte[] bytes = file.getBytes();
                Path path = Paths.get(UPLOAD_DIR + filename);
                Files.write(path, bytes);

                Image image = new Image();
                image.setFilename(filename);
                imageRepository.save(image);
            }
        }
    }
    
    
    public List<String> getAllImageFilenames() {
        List<String> imageFilenames = new ArrayList<>();
        List<Image> images = imageRepository.findAll();
        
        for (Image image : images) {
        	
            imageFilenames.add(image.getFilename());
        }
        
        return imageFilenames;
    }
    
 
    
   
    public Resource getImageResource(String filename) {
        if (!StringUtils.isEmpty(filename)) {
        	
            Path imagePath = Paths.get(UPLOAD_DIR, filename); // Update this path based on your configuration
           System.out.println("path"+imagePath);
            File imageFile = imagePath.toFile();

            if (imageFile.exists()) {
                return new FileSystemResource(imageFile);
            }
        }

        return null;
    }
    
}
