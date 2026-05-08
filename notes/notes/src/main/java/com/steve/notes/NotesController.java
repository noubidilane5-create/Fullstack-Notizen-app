package com.steve.notes;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.steve.notes.NoteRepository;

@RestController
@RequestMapping("/notes")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://192.168.0.144:3000"
})

public class NotesController {

    private final NoteService service;
    private final NoteMapper mapper;

    public NotesController(NoteService service, NoteMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<NoteDto> getAllNotes() {
        return service.getAllNotes()
                .stream()
                .map(mapper::toDto)
                .toList();
    }

    @PostMapping
    public NoteDto createNote(@RequestBody NoteDto dto) {
        return mapper.toDto(service.createNote(dto));
    }

    @PutMapping("/{id}")
    public NoteDto updateNote(@PathVariable Long id, @RequestBody NoteDto dto) {
        return mapper.toDto(service.updateNote(id, dto));
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        service.deleteNote(id);
    }

    @GetMapping("/{id}")
    public NoteDto getNoteById(@PathVariable Long id) {
        return mapper.toDto(service.getNoteById(id));
    }

}
