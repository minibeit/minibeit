package com.minibeit.interests.web;

import com.minibeit.MvcTest;
import com.minibeit.interests.domain.Interests;
import com.minibeit.interests.dto.InterestsResponse;
import com.minibeit.interests.service.InterestsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(InterestsController.class)
class InterestsControllerTest extends MvcTest {
    @MockBean
    private InterestsService interestsService;

    private Interests interests1;
    private Interests interests2;
    private Interests interests3;

    @BeforeEach
    public void setup() {
        interests1 = Interests.builder().id(1L).name("IT").build();
        interests2 = Interests.builder().id(2L).name("미디어").build();
        interests3 = Interests.builder().id(3L).name("식품").build();
    }

    @Test
    @DisplayName("학교 검색 리스트 조회(시작 글짜)")
    public void getList() throws Exception {
        List<InterestsResponse.IdAndName> response = new ArrayList<>();
        InterestsResponse.IdAndName getList1 = InterestsResponse.IdAndName.build(interests1);
        InterestsResponse.IdAndName getList2 = InterestsResponse.IdAndName.build(interests2);
        InterestsResponse.IdAndName getList3 = InterestsResponse.IdAndName.build(interests3);
        response.add(getList1);
        response.add(getList2);
        response.add(getList3);

        given(interestsService.getList()).willReturn(response);

        ResultActions results = mvc.perform(get("/api/interests/list"));

        results.andExpect(status().isOk())
                .andDo(document("interests-list",
                        responseFields(
                                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("관심분야 식별자"),
                                fieldWithPath("[].name").type(JsonFieldType.STRING).description("관심분야 이름")
                        )
                ));
    }
}