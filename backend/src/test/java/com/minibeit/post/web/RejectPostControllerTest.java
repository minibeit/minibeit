package com.minibeit.post.web;

import com.minibeit.MvcTest;
import com.minibeit.post.service.RejectPostService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RejectPostController.class)
class RejectPostControllerTest extends MvcTest {
    @MockBean
    private RejectPostService rejectPostService;


    @Test
    @DisplayName("반려게시물 삭제 문서화")
    public void deleteOne() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .delete("/api/rejectPost/{rejectPostId}", 1));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("rejectPost-deleteOne",
                        pathParameters(
                                parameterWithName("rejectPostId").description("삭제할 반려 게시물 식별자")
                        )
                ));
    }
}