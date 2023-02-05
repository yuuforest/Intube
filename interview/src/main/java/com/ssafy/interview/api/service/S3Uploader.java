package com.ssafy.interview.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Optional;
import java.util.UUID;

@Service
public class S3Uploader {

    @Autowired
    AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String S3Bucket;

//    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
//        File uploadFile = convert(multipartFile).orElseThrow(() -> new IllegalArgumentException("error : MultipartFile -> file convert fail"));
//        return upload(multipartFile, dirName);
//    }

    // S3로 파일 업로드하기
    public String upload(MultipartFile uploadFile, String dirName) throws IOException {
        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();  // S3에 저장된 파일 이름
        String uploadImageUrl = putS3(uploadFile, fileName); // s3로 업로드
//        removeNewFile(uploadFile);
        return fileName;
    }

    // 로컬에 저장된 이미지 지우기
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            return;
        }
    }

    // S3로 업로드
    private String putS3(MultipartFile uploadFile, String fileName) throws IOException {
//        amazonS3Client.putObject(new PutObjectRequest(S3Bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        //파일 형식 구하기
        String ext = fileName.split("\\.")[1];
        System.out.println("ext >>> " + ext);
        String contentType = "";

        //content type을 지정해서 올려주지 않으면 자동으로 "application/octet-stream"으로 고정이 되서 링크 클릭시 웹에서 열리는게 아니라 자동 다운이 시작됨.
        switch (ext) {
            case "jpeg":
                contentType = "image/jpeg";
                break;
            case "png":
                contentType = "image/png";
                break;
            case "txt":
                contentType = "text/plain";
                break;
            case "csv":
                contentType = "text/csv";
                break;
        }

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentType(contentType);
        objMeta.setContentLength(uploadFile.getInputStream().available());

//        amazonS3Client.putObject(new PutObjectRequest(S3Bucket, fileName, uploadFile.getInputStream(), objMeta)
//                .withCannedAcl(CannedAccessControlList.PublicRead));
        amazonS3Client.putObject(S3Bucket, fileName, uploadFile.getInputStream(), objMeta);
        String result = amazonS3Client.getUrl(S3Bucket, fileName).toString();
        return result;
    }

    // 로컬에 파일 업로드
    private Optional<File> convert(MultipartFile file) throws IOException {
        String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.') + 1);
        String o_FileName = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.'));
        String StrToday = (new SimpleDateFormat("yyyyMMddHHmmss").format(Calendar.getInstance().getTime()));
        String strFileName = "_" + StrToday + "." + ext;

        File convertFile = new File(System.getProperty("user.dir") + "/" + strFileName);
//        if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
//            try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
//                fos.write(file.getBytes());
//            }
        return Optional.of(convertFile);
//        }
//        return Optional.empty();
    }
}
