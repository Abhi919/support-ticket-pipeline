package com.support.tickets.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AddCommentRequest(
        @NotBlank @Size(max = 120) String author,
        @NotBlank @Size(max = 4000) String body
) {
}
