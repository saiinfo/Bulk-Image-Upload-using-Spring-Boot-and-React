package com.imageuploding.image.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.imageuploding.image.domain.Image;



public interface ImageRepository extends JpaRepository<Image, Long> {
	
}