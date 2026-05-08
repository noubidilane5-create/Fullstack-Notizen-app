package com.steve.notes;

import org.springframework.stereotype.Service;
import java.util.List;
import com.steve.notes.NotFoundException;

@Service
public class NoteService {

    private final NoteRepository repository;
    private final NoteMapper mapper;

    public NoteService(NoteRepository repository, NoteMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<Note> getAllNotes() {
        return repository.findAll();
    }

    public Note createNote(NoteDto dto) {
        Note note = mapper.toEntity(dto);
        return repository.save(note);
    }

    public Note getNoteById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
    }

    public void deleteNote(Long id) {
        repository.deleteById(id);
    }

    public Note updateNote(Long id, NoteDto dto) {
        return repository.findById(id)
                .map(note -> {
                    note.setTitle(dto.getTitle());
                    note.setContent(dto.getContent());
                    return repository.save(note);
                })
                .orElseThrow(() -> new NotFoundException("Note not found"));
    }
}
