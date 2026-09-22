package com.support.tickets.web.dto;

import com.support.tickets.domain.Comment;

import java.time.LocalDateTime;

public record CommentResponse(
        Long id,
        String author,
        String body,
        LocalDateTime createdAt
) {
    public static CommentResponse from(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getAuthor(),
                comment.getBody(),
                comment.getCreatedAt()
        );
    }
}
