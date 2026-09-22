package com.support.tickets.web.dto;

import com.support.tickets.domain.Priority;
import com.support.tickets.domain.Ticket;
import com.support.tickets.domain.TicketStatus;

import java.time.LocalDateTime;
import java.util.List;

public record TicketResponse(
        Long id,
        String title,
        String description,
        Priority priority,
        TicketStatus status,
        String assignee,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<CommentResponse> comments
) {
    public static TicketResponse from(Ticket ticket) {
        return new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getPriority(),
                ticket.getStatus(),
                ticket.getAssignee(),
                ticket.getCreatedAt(),
                ticket.getUpdatedAt(),
                ticket.getComments().stream().map(CommentResponse::from).toList()
        );
    }

    public static TicketResponse fromSummary(Ticket ticket) {
        return new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getPriority(),
                ticket.getStatus(),
                ticket.getAssignee(),
                ticket.getCreatedAt(),
                ticket.getUpdatedAt(),
                List.of()
        );
    }
}
