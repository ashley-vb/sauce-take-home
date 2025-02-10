import {useEffect, useState} from "react";
import {Feedback, feedbacksQuery} from "./api.ts";


export default function FeedbackList() {
  const [page, setPage] = useState(1);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const perPage = 10;

  useEffect(() => {
    feedbacksQuery(page, perPage).then((result) => {
      setFeedbacks(result.feedbacks.values)
      setTotalPages(Math.ceil(result.feedbacks.count/10))
    });
  }, [page]);

  const onNext = () => {
      if (page < totalPages) {
          setPage(page + 1);
      }
  }

    const onPrevious = () => {
      if (page > 1) {
          setPage(page - 1);
      }
    }

  // todo add additional css and maybe move some values to api
  return (
      <>
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Feedback</h1>
          {feedbacks.map((feedback) => (
            <button key={feedback.id} className="bg-slate-700 bg-opacity-20 hover:bg-opacity-30 cursor-pointer rounded-lg py-2 px-4 text-left">
              <p className="text-red-300">{feedback.text}</p>
            </button>
          ))}
        </div>
          <div className="flex justify-between items-center">
              <button onClick={onPrevious} disabled={page === 1}>Previous</button>
              <span>Page {page} of {totalPages}</span>
              <button onClick={onNext} disabled={page === totalPages}>Next</button>
          </div>
      </>
  );
}