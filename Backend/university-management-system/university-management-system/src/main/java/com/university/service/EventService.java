package com.university.service;

import com.university.dto.EventDTO;
import com.university.entity.Event;
import com.university.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;
    
    public List<EventDTO> getUpcomingEvents() {
        LocalDate today = LocalDate.now();
        List<Event> events = eventRepository.findByEventDateGreaterThanEqualAndIsActiveTrueOrderByEventDateAsc(today);
        
        return events.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<EventDTO> getAllActiveEvents() {
        List<Event> events = eventRepository.findByIsActiveTrueOrderByEventDateAsc();
        
        return events.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private EventDTO convertToDTO(Event event) {
        return new EventDTO(
            event.getId(),
            event.getTitle(),
            event.getDescription(),
            event.getEventDate(),
            event.getLocation()
        );
    }
}
