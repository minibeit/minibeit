# minibeit

**[:fire: Minibeit](https://minibeit.com/)**

<img src="https://user-images.githubusercontent.com/88070276/156918330-d0567aa9-c33f-457e-adb6-15d6ba6348ad.png" width='150'>

<br/>

**[📓 자세한 내용 더보기 [Notion]](https://www.notion.so/Code-Convention-d5eec96f33f34b1e97984d2088aed444)**

<br/>

# 프로젝트 소개

### 아이템 선정동기

- 연구자와 피실험자를 연결하는 서비스를 통해 연구자들이 겪는 피실험자 구인의 어려움을 해결하고자 합니다.

- 현재 연구자와 피실험자를 연결하는 플랫폼의 부재에 의한 불편함은 연구자만이 아니라 피실험자도 겪고 있습니다.

<br/>
    <details>
        <summary>더 자세히보기</summary>
        <div markdown="1">
          
       1. 현재 많은 피실험자 구인 구직은 알바 구인 구직 사이트 및 폐쇄적인 성향을 지닌 학교 커뮤니티 사이트에서 이루어지고 있고 이는 연구 진행에 있어 큰 걸림돌이 되고 있습니다.  
          
       2. 실험 참여에 관심이 있어도 정보를 얻을 수 있는 마땅한 매체가 없는 현 상황에서 해당 커뮤니티 내에 참여할 수 없는 잠재적 피실험자들은 다양한 경험과 연구 참여 보상의 기회를 박탈당하고 있습니다.
  </div>
    </details>  
        <br/>

**:point_right:따라서 현재 팀은 위의 문제를 해결하기 위해, 연구 기관의 피실험자 구인 만을 모아두는 연구 기관-피실험자 매칭 플랫폼을 제작하고자 합니다.**

<br/>
<br/>

# 프로젝트 기능들
<details>
    <summary>1. 소셜로그인 (구글, 카카오), 회원가입</summary>
    <div markdown="2">
    <br/>
<img src="https://user-images.githubusercontent.com/88070276/156913641-feb6faba-5e59-4f77-bbe7-bf7bbf68f773.png" />

<br/>

```      
1. 이메일 인증  

2. 폰문자 인증
```

</div>
    </details>
    <br/>

  <details>
    <summary>2. 비즈니스 프로필 만들기</summary>
    <br/>
    <div markdown="2">
    <img src="https://user-images.githubusercontent.com/88070276/156913917-2ae445db-9ab1-474c-b942-de61ac4f9c31.png" />

<br/>

```
  1. 비즈니스 프로필 소속인원 추가(비즈니스 프로필 담당자)

  2. 비즈니스 프로필 권한양도

  3. 비즈니스 프로필 수정  
  4. 비즈니스 프로필 삭제 (모집하고 있는 게시물이 없을 때 담당자만 가능)  
  5. 생성한 모집공고, 완료된 모집공고, 후기 목록 조회 
    - 생성한 모집공고 목록에서 참여자 관리 가능, 모집 종료 가능  
    - 날짜에 따른 대기자명단에서 확정, 확정 취소, 반려 가능  
    - 확정(해당 참여자가 그 시간에 참여하는 모집이 없으면, 모집인원이 다 안찼으면,반려 시 참여자에게 메일 전송  
    - 날짜에 따른 확정자명단에서 확정취소가능  
    - 확정취소시 참여자에게 메일 전송  
    - 완료된 모집공고에서 일정종료(게시물 삭제)  
```
</div>
    </details>
  <br/>

<details>
    <summary>3. 모집 지원 </summary>
    <br/>
    <div markdown="2">
<img src="https://user-images.githubusercontent.com/88070276/156914633-e579b817-ae09-4b6f-a9b1-49c1374e0a8f.png" />

<br/>

```
1. 학교와 날짜로 모집 검색    
    - 상세필터와 실험분야로 추가적인 필터링  
2. 모집 상세 조회  
    - 날짜 변경하여 시간 확인 및 지원가능(모집인원이 다 안찼을 때만 가능)  
    - 비즈니스 프로필에 속한사람은 모집글 세부사항 수정가능  
    - 실험실 후기 목록 조회  
3. 모집글 즐겨찾기 가능(지원하면 사라짐) 
```
</div>
    </details>  
    <br/>

 <details>
    <summary>4. 개인 프로필</summary>
    <br/>
    <div markdown="2">
<img src="https://user-images.githubusercontent.com/88070276/156914888-2574d729-8444-4bd5-a9fc-340fb1896b63.png" />

<br/>

```

1. 개인정보 수정가능  
2. 확정된목록   
    - 지원하고 비즈니스프로필에서 확정한 상태  
    - 참여완료(실험 시작시간 + 걸린시간이 지금 이후여야 가능)  
    - 참여완료버튼 누르면 후기 작성가능  
    - 참여취소 (비즈니스프로필쪽으로 메일 전송)  
3. 대기중목록  
    - 참여취소가능  
4. 반려된 목록  
    - 반려된 목록 삭제  
```
</div>
    </details>
  
 <br/>
 <br/>

# 브랜치 관리 전략

Git Flow를 사용하여 브랜치를 관리합니다.
모든 브랜치는 Pull Request에 리뷰를 진행한 후 merge를 진행합니다.
현재 개발 진행사항을 확인하고 싶다면 PR를 확인해주세요.

<br/>
<br/>


# :computer:기술 스택

<img src="https://user-images.githubusercontent.com/88070276/156918202-5e5ffa91-cfb9-4d8f-9c71-389630b0833f.png" width="750"/>
