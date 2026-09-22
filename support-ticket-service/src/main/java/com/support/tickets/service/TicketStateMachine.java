package com.support.tickets.service;

import com.support.tickets.domain.TicketStatus;
import com.support.tickets.exception.InvalidStatusTransitionException;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

@Component
public class TicketStateMachine {

    private final Map<TicketStatus, Set<TicketStatus>> allowedTransitions;

    public TicketStateMachine() {
        allowedTransitions = new EnumMap<>(TicketStatus.class);
        allowedTransitions.put(TicketStatus.OPEN, EnumSet.of(TicketStatus.IN_PROGRESS, TicketStatus.CANCELLED));
        allowedTransitions.put(TicketStatus.IN_PROGRESS, EnumSet.of(TicketStatus.RESOLVED, TicketStatus.CANCELLED));
        allowedTransitions.put(TicketStatus.RESOLVED, EnumSet.of(TicketStatus.CLOSED));
        allowedTransitions.put(TicketStatus.CLOSED, EnumSet.noneOf(TicketStatus.class));
        allowedTransitions.put(TicketStatus.CANCELLED, EnumSet.noneOf(TicketStatus.class));
    }

    public TicketStatus transition(TicketStatus current, TicketStatus target) {
        if (current == target) {
            return current;
        }
        Set<TicketStatus> allowed = allowedTransitions.getOrDefault(current, EnumSet.noneOf(TicketStatus.class));
        if (!allowed.contains(target)) {
            throw new InvalidStatusTransitionException(
                    "Cannot transition from " + current + " to " + target);
        }
        return target;
    }

    public boolean isTransitionAllowed(TicketStatus current, TicketStatus target) {
        if (current == target) {
            return true;
        }
        return allowedTransitions.getOrDefault(current, EnumSet.noneOf(TicketStatus.class)).contains(target);
    }
}
