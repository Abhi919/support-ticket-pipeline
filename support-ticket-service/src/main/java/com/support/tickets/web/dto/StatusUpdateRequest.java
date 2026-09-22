package com.support.tickets.web.dto;

import com.support.tickets.domain.TicketStatus;
import jakarta.validation.constraints.NotNull;

public record StatusUpdateRequest(
        @NotNull TicketStatus status
) {
}
