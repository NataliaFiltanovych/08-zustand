"use client";

import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./notes.module.css";

import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { JSX, useState } from "react";
import Pagination from "../../../../components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";

interface NotesClientProps {
  tag: string | undefined;
}

const NotesClient = ({ tag }: NotesClientProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes", searchValue, currentPage, tag],
    queryFn: () => fetchNotes(searchValue, currentPage, tag ?? ""),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((query) => {
    setSearchValue(query);
    setCurrentPage(1);
  }, 1000);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
