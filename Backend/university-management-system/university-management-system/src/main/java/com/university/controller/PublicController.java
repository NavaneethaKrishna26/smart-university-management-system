package com.university.controller;

import com.university.dto.ApiResponse;
import com.university.dto.EventDTO;
import com.university.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*")
public class PublicController {
    
    @Autowired
    private EventService eventService;
    
    @GetMapping("/events")
    public ResponseEntity<List<EventDTO>> getUpcomingEvents() {
        List<EventDTO> events = eventService.getUpcomingEvents();
        return ResponseEntity.ok(events);
    }
    
    @GetMapping("/events/all")
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        List<EventDTO> events = eventService.getAllActiveEvents();
        return ResponseEntity.ok(events);
    }
    
    @GetMapping("/health")
    public ResponseEntity<ApiResponse> healthCheck() {
        return ResponseEntity.ok(new ApiResponse(true, "University Management System is running"));
    }
}
