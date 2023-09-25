# 가볍고 자유로운 모든 인터뷰를 위해, InTube
> 당신이 원하는 인터뷰를 자유롭게 진행하여 기록과 함께 결과를 공유해보세요. 

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]
<br/><br/>
InTube는 1:1, 1:N, 아바타(AVATA) 인터뷰 서비스를 제공하는 WebRTC 기반 Web 플랫폼입니다.  
인터뷰어가 되어 내가 만든 인터뷰를 진행하고, 진행 결과를 자유롭게 수정하여 공유할 수 있습니다.  
또는 인터뷰이가 되어 내가 원하는 인터뷰를 신청해 포인트를 지급받아 소소한 재미를 느끼실 수 있습니다.
<br/><br/>
<img src= ".\Documents\images\intube_logo.png">


<br/><br/>

## 🚀 팀원 소개
<img src= ".\Documents\images\intube_팀원소개1.png">
<img src= ".\Documents\images\intube_팀원소개2.png">

<br/><br/>

## 🔌 기술 스택
<img src= ".\Documents\images\intube_기술스택.png">

<br/><br/>

## ☁️ 데이터베이스 구조 (ERD)

<img src= ".\Documents\images\intube_erd.png">

<br/><br/>

## 📚 Overview

### 📺 로그인(기본 및 카카오)
```
회원 정보 생성, 수정, 삭제 관련 기능을 제공합니다.
```

<img src= ".\Documents\images\inTube_로그인.png">

### 📺 마이페이지
```
회원 정보와 내가 신청한, 매칭된, 완료한 인터뷰의 수를 조회할 수 있으며, 캘린더를 확인해 매칭된 인터뷰 정보를 날짜에 맞게 확인할 수 있는 기능을 제공합니다.
```

<img src= ".\Documents\images\intube_마이페이지.gif" height="400px" width="800px"><br>

### 📺 메인페이지 및 공고찾기
```
메인페이지와 상단에 있는 공고찾기 버튼을 통해 현재 모집 중인 인터뷰들을 등록, 마감, 포인트 순으로 조회하는 기능을 제공합니다.
```

<img src= ".\Documents\images\intube_메인.png">
<img src= ".\Documents\images\intube_공고찾기.png">


### 📺 질문자
#### 공고 생성
```
1:1, 1:N, 아바타(AVATA) 종류를 선택하고 기본 정보들과 질문들을 포함한 인터뷰를 자유롭게 생성할 수 있는 기능을 제공합니다.
```

<img src= ".\Documents\images\intube_공고생성.gif" height="400px" width="800px"><br>

#### 인터뷰 관리 - 전체 인터뷰관리
```
전제 인터뷰관리 : 작성한 인터뷰의 상태(모집, 진행, 완료) 별로 조회가 가능합니다. 
    1. 완료된 인터뷰는 녹화된 영상과 수정된 결과를 조회할 수 있으며, 결과는 엑셀 파일로 내보낼 수 있다.
```
<img src= ".\Documents\images\intube_전체인터뷰관리.gif" height="400px" width="800px"><br>

#### 인터뷰 관리 - 지원자 관리
```
지원자 관리 : 인터뷰 시간 별 지원현황을 관리하는 페이지로 합격 대기 중인 지원자를 합격/불합격 여부를 선택할 수 있습니다. 합격된 지원자는 해당 인터뷰가 매칭된 상태로 바뀌고 불합격된 지원자는 지원여부가 취소된 상태로 바뀌게 됩니다.
```

<img src= ".\Documents\images\intube_지원자관리.gif" height="400px" width="800px"><br>

#### 인터뷰 관리 - 인터뷰 진행
```
인터뷰 진행 : 모집이 끝난 인터뷰를 관리하는 페이지입니다.
    1. 인터뷰 방을 생성하여 인터뷰 진행이 가능합니다.
    2-1. 해당 시간에 맞는 인터뷰가 종료되면 지원자 평가와 인터뷰 결과 수정을 진행할 수 있습니다.  
    2-2. 인터뷰 결과 수정은 녹화된 영상을 참고해 질문 별로 수정이 가능하고 TimeStamp를 클릭해서 영상 클립 별로 확인이 가능하다.
    3. 모든 시간의 인터뷰 진행이 종료되고 평가 및 결과 수정까지 완료되었으면 상단 우측에 인터뷰 마감을 클릭하여 인터뷰 상태를 완료로 변경할 수 있다.
```
<img src= ".\Documents\images\intube_인터뷰진행.gif" height="400px" width="800px"><br>

### 📺 답변자
#### 인터뷰 신청
```
공고 찾기 메뉴를 통해 1:1, 1:N, 아바타(AVATA) 인터뷰를 신청할 수 있습니다. 검색 및 정렬기능을 제공합니다.
```

<img src= ".\Documents\images\intube_인터뷰신청.gif" height="400px" width="800px"><br>

#### 인터뷰 조회(신청, 매칭, 완료)
```
상단 좌측 버튼을 클릭해 내가 신청한, 매칭된, 완료된 인터뷰들을 조회할 수 있으며 각각 기능들을 제공합니다.
```

<img src= ".\Documents\images\intube_인터뷰조회.gif" height="400px" width="800px"><br>

### 📺 인터뷰 진행(공통)
```
인터뷰 방이 생성되고 지원자들이 입장하게 되면 해당 질문들을 통해 인터뷰가 진행됩니다.  
    1. 발언권 조정 기능
    2. 질문자 - 질문 조회 및 클릭 시 해당 질문 진행 
    3. 발언 시 Speech To Text 기능으로 내가 말한 내용을 실시간 텍스트로 확인할 수 있다. 
    4. 아바타 진행 시 답변자는 질문을 자유롭게 클릭하여 인터뷰를 진행할 수 있다.
```

<img src= ".\Documents\images\intube_인터뷰.gif" height="400px" width="800px"><br><br>

<br/><br/>

## 🎥 UCC
👉 [보러가기](https://github.com/yuuforest/Intube/blob/develop/Documents/ucc/Intube_UCC.mp4)

<br/><br/>

## 🔬 개발 과정

### 📋 API 명세서

<img src= ".\Documents\images\intube_서비스.png">

### ✒️ Swagger

<img src= ".\Documents\images\intube_swagger.png">