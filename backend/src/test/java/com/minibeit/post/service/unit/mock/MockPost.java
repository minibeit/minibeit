package com.minibeit.post.service.unit.mock;

import com.minibeit.businessprofile.domain.BusinessProfile;
import com.minibeit.businessprofile.service.unit.MockBusinessProfile;
import com.minibeit.post.domain.Payment;
import com.minibeit.post.domain.Post;
import com.minibeit.post.domain.PostLike;
import com.minibeit.post.domain.PostStatus;
import com.minibeit.post.service.dto.PostDto;
import com.minibeit.post.service.dto.PostRequest;
import com.minibeit.post.service.dto.PostResponse;
import com.minibeit.school.domain.School;
import com.minibeit.school.service.unit.MockSchool;
import com.minibeit.user.domain.User;
import com.minibeit.user.service.unit.MockUser;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Collections;

import static com.minibeit.post.service.unit.mock.MockPostApplicant.MockPostApplicant1;

public class MockPost {
    public static class MockPost1 {
        public static final Long ID = 1L;
        public static final String TITLE = "모집글 제목";
        public static final String CONTENT = "모집글 내용";
        public static final String PLACE = "고려대학교";
        public static final String PLACE_DETAIL = "신공학관 123호";
        public static final String CONTACT = "010-1234-1234";
        public static final String CATEGORY = "미디어";
        public static final Integer RECRUIT_PEOPLE = 5;
        public static final Payment PAYMENT = Payment.CACHE;
        public static final Integer PAYMENT_CACHE = 10000;
        public static final String PAYMENT_DETAIL = "즉시 지급합니다.";
        public static final boolean RECRUITMENT_CONDITION = true;
        public static final String RECRUITMENT_CONDITION_DETAIL = "개발자만";
        public static final Integer DO_TIME = 60;
        public static final LocalDateTime START_DATE = LocalDateTime.of(2022, 2, 13, 0, 0);
        public static final LocalDateTime END_DATE = LocalDateTime.of(2022, 2, 15, 0, 0);
        public static final PostStatus POST_STATUS = PostStatus.RECRUIT;
        public static final String THUMBNAIL = "썸네일 url";
        public static final School SCHOOL = MockSchool.School1.SCHOOL;
        public static final BusinessProfile BUSINESS_PROFILE = MockBusinessProfile.BusinessProfile1.BUSINESS_PROFILE;
        public static final boolean DEL = false;

        public static final Long POST_LIKE_ID = 1L;
        public static final User POST_LIST_USER = MockUser.MockUser1.USER;

        public static final MultipartFile MOCK_FILE = new MockMultipartFile("filename", "test".getBytes());

        public static final Post POST = Post.builder()
                .id(ID)
                .title(TITLE)
                .content(CONTENT)
                .place(PLACE)
                .placeDetail(PLACE_DETAIL)
                .contact(CONTACT)
                .category(CATEGORY)
                .recruitPeople(RECRUIT_PEOPLE)
                .payment(PAYMENT)
                .paymentCache(PAYMENT_CACHE)
                .paymentDetail(PAYMENT_DETAIL)
                .recruitCondition(RECRUITMENT_CONDITION)
                .recruitConditionDetail(RECRUITMENT_CONDITION_DETAIL)
                .doTime(DO_TIME)
                .startDate(START_DATE)
                .endDate(END_DATE)
                .postStatus(POST_STATUS)
                .thumbnail(THUMBNAIL)
                .businessProfile(BUSINESS_PROFILE)
                .school(SCHOOL)
                .del(DEL)
                .build();

        public static final PostLike POST_LIKE = PostLike.builder()
                .id(POST_LIKE_ID)
                .post(POST)
                .user(POST_LIST_USER)
                .build();

        public static final PostRequest.CreateInfo CREATE_INFO_REQUEST = PostRequest.CreateInfo.builder()
                .title(TITLE)
                .content(CONTENT)
                .place(PLACE)
                .contact(CONTACT)
                .category(CATEGORY)
                .headcount(RECRUIT_PEOPLE)
                .payment(PAYMENT)
                .cache(PAYMENT_CACHE)
                .goods(null)
                .paymentDetail(PAYMENT_DETAIL)
                .condition(RECRUITMENT_CONDITION)
                .conditionDetail(RECRUITMENT_CONDITION_DETAIL)
                .doTime(DO_TIME)
                .schoolId(SCHOOL.getId())
                .businessProfileId(BUSINESS_PROFILE.getId())
                .startDate(START_DATE)
                .endDate(END_DATE)
                .doDateList(Collections.singletonList(PostDto.PostDoDate.builder().doDate(MockPostDoDate.MockPostDoDate1.DO_DATE).build()))
                .build();

        public static final PostResponse.GetMyApplyList GET_MY_APPLY_LIST = PostResponse.GetMyApplyList.builder()
                .id(ID)
                .contact(CONTACT)
                .postDoDateId(MockPostDoDate.MockPostDoDate1.ID)
                .title(TITLE)
                .time(DO_TIME)
                .category(CATEGORY)
                .address(PLACE)
                .addressDetail(PLACE_DETAIL)
                .thumbnail(THUMBNAIL)
                .doDate(MockPostDoDate.MockPostDoDate1.DO_DATE)
                .recruitCondition(RECRUITMENT_CONDITION)
                .status(MockPostApplicant1.APPLY_STATUS.name())
                .writeReview(MockPostApplicant1.WRITE_REVIEW)
                .businessProfileId(BUSINESS_PROFILE.getId())
                .businessProfileName(BUSINESS_PROFILE.getName())
                .build();

        public static final PostRequest.RejectComment REJECT_COMMENT_REQUEST= PostRequest.RejectComment.builder()
                .rejectComment("모집이 종료되었습니다.")
                .build();

        public static final PostRequest.UpdateContent UPDATE_CONTENT_REQUEST=PostRequest.UpdateContent.builder()
                .updatedContent("수정된 내용")
                .build();
    }
}
