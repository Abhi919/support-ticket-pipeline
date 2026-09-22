package com.example.awslambda.api;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class DemoController {

    @GetMapping("/hello")
    public Map<String, Object> hello(@RequestParam(name = "name", defaultValue = "world") String name) {
        return Map.of(
                "message", "Hello, " + name + "!",
                "source", "Spring Boot on AWS Lambda",
                "time", Instant.now().toString()
        );
    }

    @GetMapping("/demo/{id}")
    public Map<String, Object> pathDemo(@PathVariable String id) {
        return Map.of("id", id, "note", "Path variables and JSON work the same as in a normal Spring app.");
    }
}
