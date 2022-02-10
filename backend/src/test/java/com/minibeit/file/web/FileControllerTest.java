package com.minibeit.file.web;

import com.minibeit.MvcTest;
import com.minibeit.file.domain.S3Uploader;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.web.servlet.ResultActions;

import java.io.ByteArrayOutputStream;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("FilerController 문서화")
@WebMvcTest(FileController.class)
public class FileControllerTest extends MvcTest {
    @MockBean
    private S3Uploader s3Uploader;

    @Test
    @DisplayName("파일 다운로드 문서화")
    public void download() throws Exception {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        given(s3Uploader.downloadFile(any())).willReturn(outputStream);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/file/download")
                .param("fileName", "fileName.jpg"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("file-download",
                        requestParameters(
                                parameterWithName("fileName").description("파일 이름")
                        )
                ));
    }

}
