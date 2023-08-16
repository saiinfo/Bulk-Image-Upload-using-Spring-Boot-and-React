package com.imageuploding.image.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Image {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    private String filename;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getFilename() {
			return filename;
		}
		public void setFilename(String filename) {
			this.filename = filename;
		}
		public Image(Long id, String filename) {
			super();
			this.id = id;
			this.filename = filename;
		}
		public Image() {
			super();
			// TODO Auto-generated constructor stub
		}
		@Override
		public String toString() {
			return "Image [id=" + id + ", filename=" + filename + "]";
		}

	    
	    
	    
	    
	   
}


