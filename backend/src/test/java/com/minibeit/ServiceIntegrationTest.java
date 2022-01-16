package com.minibeit;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Import({
        MailTestConfig.class,
})
public abstract class ServiceIntegrationTest {

}
