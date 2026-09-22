package com.support.tickets.service;

import com.support.tickets.domain.Comment;
import com.support.tickets.domain.Priority;
import com.support.tickets.domain.Ticket;
import com.support.tickets.domain.TicketStatus;
import com.support.tickets.repository.TicketRepository;
import com.support.tickets.web.dto.AddCommentRequest;
import com.support.tickets.web.dto.CreateTicketRequest;
import com.support.tickets.web.dto.StatusUpdateRequest;
import com.support.tickets.web.dto.TicketResponse;
import com.support.tickets.web.dto.UpdateTicketRequest;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TicketService {

    private final TicketRepository ticketRepository;
    private final TicketStateMachine stateMachine;

    public TicketService(TicketRepository ticketRepository, TicketStateMachine stateMachine) {
        this.ticketRepository = ticketRepository;
        this.stateMachine = stateMachine;
    }

    public TicketResponse createTicket(CreateTicketRequest request) {
        Ticket ticket = new Ticket();
        ticket.setTitle(request.title());
        ticket.setDescription(request.description());
        ticket.setPriority(request.priority());
        ticket.setAssignee(request.assignee());
        ticket.setStatus(TicketStatus.OPEN);
        return TicketResponse.from(ticketRepository.save(ticket));
    }

    @Transactional(readOnly = true)
    public List<TicketResponse> listTickets(TicketStatus status, String q) {
        return ticketRepository.findByFilters(status, q).stream()
                .map(TicketResponse::fromSummary)
                .toList();
    }

    @Transactional(readOnly = true)
    public TicketResponse getTicket(Long id) {
        return TicketResponse.from(findTicketOrThrow(id));
    }

    public TicketResponse updateTicket(Long id, UpdateTicketRequest request) {
        Ticket ticket = findTicketOrThrow(id);
        ticket.setTitle(request.title());
        ticket.setDescription(request.description());
        ticket.setPriority(request.priority());
        ticket.setAssignee(request.assignee());
        return TicketResponse.from(ticketRepository.save(ticket));
    }

    public TicketResponse updateStatus(Long id, StatusUpdateRequest request) {
        Ticket ticket = findTicketOrThrow(id);
        TicketStatus newStatus = stateMachine.transition(ticket.getStatus(), request.status());
        ticket.setStatus(newStatus);
        return TicketResponse.from(ticketRepository.save(ticket));
    }

    public TicketResponse addComment(Long id, AddCommentRequest request) {
        Ticket ticket = findTicketOrThrow(id);
        Comment comment = new Comment();
        comment.setAuthor(request.author());
        comment.setBody(request.body());
        ticket.addComment(comment);
        return TicketResponse.from(ticketRepository.save(ticket));
    }

    private Ticket findTicketOrThrow(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found: " + id));
    }
}
