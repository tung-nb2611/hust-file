package com.example.filedemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import java.io.File;

@SpringBootApplication
public class FileDemoApplication {

	public static void main(String[] args) {
		//tạo thư mục tại ổ D khi chạy lần đầu
		File file = new File("D:\\hust-file");
		if (!file.exists()) {
			if (file.mkdir()) {
				System.out.println("Directory is created!");
			} else {
				System.out.println("Failed to create directory!");
			}
		}
		SpringApplication.run(FileDemoApplication.class, args);
	}
}
