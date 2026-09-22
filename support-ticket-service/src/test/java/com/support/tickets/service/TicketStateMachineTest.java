package com.support.tickets.service;

import com.support.tickets.domain.TicketStatus;
import com.support.tickets.exception.InvalidStatusTransitionException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TicketStateMachineTest {

    private TicketStateMachine stateMachine;

    @BeforeEach
    void setUp() {
        stateMachine = new TicketStateMachine();
    }

    @Test
    void shouldAllowValidTransitionsFromOpen() {
        assertEquals(TicketStatus.IN_PROGRESS,
                stateMachine.transition(TicketStatus.OPEN, TicketStatus.IN_PROGRESS));
        assertEquals(TicketStatus.CANCELLED,
                stateMachine.transition(TicketStatus.OPEN, TicketStatus.CANCELLED));
    }

    @Test
    void shouldAllowHappyPathToClosed() {
        TicketStatus status = TicketStatus.OPEN;
        status = stateMachine.transition(status, TicketStatus.IN_PROGRESS);
        status = stateMachine.transition(status, TicketStatus.RESOLVED);
        status = stateMachine.transition(status, TicketStatus.CLOSED);
        assertEquals(TicketStatus.CLOSED, status);
    }

    @Test
    void shouldRejectInvalidTransitions() {
        assertThrows(InvalidStatusTransitionException.class,
                () -> stateMachine.transition(TicketStatus.CLOSED, TicketStatus.OPEN));
        assertThrows(InvalidStatusTransitionException.class,
                () -> stateMachine.transition(TicketStatus.RESOLVED, TicketStatus.OPEN));
        assertThrows(InvalidStatusTransitionException.class,
                () -> stateMachine.transition(TicketStatus.CANCELLED, TicketStatus.IN_PROGRESS));
        assertThrows(InvalidStatusTransitionException.class,
                () -> stateMachine.transition(TicketStatus.OPEN, TicketStatus.CLOSED));
    }

    @Test
    void shouldAllowSameStatusNoOp() {
        assertEquals(TicketStatus.OPEN, stateMachine.transition(TicketStatus.OPEN, TicketStatus.OPEN));
        assertTrue(stateMachine.isTransitionAllowed(TicketStatus.CLOSED, TicketStatus.CLOSED));
    }
}
