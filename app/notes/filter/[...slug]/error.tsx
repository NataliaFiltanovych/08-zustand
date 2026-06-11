"use client";

interface ErrorPageProps {
  error: Error;
}
const ErrorPage = ({ error }: ErrorPageProps) => {
  return <p>Could not fetch the list of notes. {error.message}</p>;
};

export default ErrorPage;
