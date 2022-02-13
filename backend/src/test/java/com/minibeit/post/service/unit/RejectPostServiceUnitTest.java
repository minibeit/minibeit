package com.minibeit.post.service.unit;

import com.minibeit.post.domain.repository.RejectPostRepository;
import com.minibeit.post.service.RejectPostService;
import com.minibeit.user.service.unit.MockUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;

import java.util.Collections;

import static com.minibeit.post.service.unit.MockRejectPost.MockRejectPost1.ID;
import static com.minibeit.post.service.unit.MockRejectPost.MockRejectPost1.REJECT_POST;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@DisplayName("RejectPostService 단위 테스트")
@ExtendWith(MockitoExtension.class)
public class RejectPostServiceUnitTest {
    @Mock
    RejectPostRepository rejectPostRepository;
    @InjectMocks
    RejectPostService rejectPostService;

    @Test
    @DisplayName("반려게시물 목록 조회성공")
    public void getList() {
        given(rejectPostRepository.findAllByUserId(any(), any())).willReturn(new PageImpl<>(Collections.singletonList(REJECT_POST)));

        rejectPostService.getList(MockPageDto.MockPageDto1.PAGE_DTO, MockUser.MockUser1.USER);

        verify(rejectPostRepository).findAllByUserId(any(), any());
    }

    @Test
    @DisplayName("반려게시물 삭제 성공")
    public void deleteOne() {
        rejectPostService.deleteOne(ID, MockUser.MockUser1.USER);

        verify(rejectPostRepository).deleteByIdAndUserId(any(), any());
    }
}
