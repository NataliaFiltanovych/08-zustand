"use client";

interface ErrorPageProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}
