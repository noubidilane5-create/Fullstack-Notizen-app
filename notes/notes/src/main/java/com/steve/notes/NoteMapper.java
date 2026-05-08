package com.steve.notes;

import org.springframework.stereotype.Component;

@Component
public class NoteMapper {

    public Note toEntity(NoteDto dto) {
        return new Note(dto.getTitle(), dto.getContent());
    }

    public NoteDto toDto(Note note) {
        return new NoteDto(note.getId(), note.getTitle(), note.getContent());
    }
}
