package com.support.tickets.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.support.tickets.repository.TicketRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class TicketStateMachineIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TicketRepository ticketRepository;

    @BeforeEach
    void setUp() {
        ticketRepository.deleteAll();
    }

    @Test
    void happyPathStatusTransitions() throws Exception {
        Long ticketId = createTicket("Status flow ticket");

        transitionStatus(ticketId, "IN_PROGRESS")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("IN_PROGRESS")));

        transitionStatus(ticketId, "RESOLVED")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("RESOLVED")));

        transitionStatus(ticketId, "CLOSED")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("CLOSED")));
    }

    @Test
    void illegalReopenFromClosedReturns409() throws Exception {
        Long ticketId = createTicket("Closed ticket");
        transitionStatus(ticketId, "IN_PROGRESS").andExpect(status().isOk());
        transitionStatus(ticketId, "RESOLVED").andExpect(status().isOk());
        transitionStatus(ticketId, "CLOSED").andExpect(status().isOk());

        transitionStatus(ticketId, "OPEN")
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.error", is("Invalid Status Transition")));
    }

    @Test
    void cancelFromOpenReturns200() throws Exception {
        Long ticketId = createTicket("Cancel ticket");

        transitionStatus(ticketId, "CANCELLED")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("CANCELLED")));
    }

    private Long createTicket(String title) throws Exception {
        MvcResult result = mockMvc.perform(post("/api/tickets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "%s",
                                  "description": "Test description",
                                  "priority": "MEDIUM"
                                }
                                """.formatted(title)))
                .andExpect(status().isCreated())
                .andReturn();

        JsonNode body = objectMapper.readTree(result.getResponse().getContentAsString());
        return body.get("id").asLong();
    }

    private org.springframework.test.web.servlet.ResultActions transitionStatus(Long id, String status)
            throws Exception {
        return mockMvc.perform(put("/api/tickets/{id}/status", id)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        { "status": "%s" }
                        """.formatted(status)));
    }
}
