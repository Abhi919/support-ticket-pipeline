package com.example.awslambda.api;

import com.example.awslambda.AwsLambdaSpringPocApplication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = AwsLambdaSpringPocApplication.class)
@AutoConfigureMockMvc
class DemoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void hello_defaultName() throws Exception {
        mockMvc.perform(get("/api/hello"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(containsString("Hello, world")));
    }

    @Test
    void hello_customName() throws Exception {
        mockMvc.perform(get("/api/hello").param("name", "Lambda"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(containsString("Hello, Lambda")));
    }

    @Test
    void pathDemo() throws Exception {
        mockMvc.perform(get("/api/demo/42"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("42"))
                .andExpect(content().contentType("application/json"));
    }
}
