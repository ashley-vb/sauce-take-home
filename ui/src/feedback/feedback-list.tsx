import {useEffect, useState} from "react";
import {Feedback, feedbacksQuery} from "./api.ts";
import {HighlightsDialog} from "./highlightsDialog/highlights-dialog.tsx";


export default function FeedbackList() {
    const [page, setPage] = useState(1);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [feedbackSelected, setFeedbackSelected] = useState<Feedback>();
    const feedbackPerPage = 10;

    useEffect(() => {
        feedbacksQuery(page, feedbackPerPage).then((result) => {
            setFeedbacks(result.feedbacks.values);
            setTotalPages(Math.ceil(result.feedbacks.count / feedbackPerPage));
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

    const toggleDialog = (showDialog: boolean, feedback: Feedback | undefined) => {
        setFeedbackSelected(feedback)
        setShowDialog(showDialog);
    };

    return (
        <>
            {feedbackSelected !== undefined && (
                <HighlightsDialog
                    feedback={feedbackSelected}
                    showDialog={showDialog}
                    onClose={(showDialog) => toggleDialog(showDialog, undefined)}
                />
            )}
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">Feedback</h1>
                {feedbacks.length === 0 ? (
                    <p>No feedback available.</p>
                ) : (
                    feedbacks.map((feedback) => (
                        <button
                            key={feedback.id}
                            className="bg-slate-700 bg-opacity-20 hover:bg-opacity-30 cursor-pointer rounded-lg py-2 px-4 text-left mb-2 w-full"
                            onClick={() => {
                                toggleDialog(true, feedback);
                            }}
                        >
                            <p className="text-red-300">{feedback.text}</p>
                        </button>
                    ))
                )}
            </div>
            <div className="flex justify-end mt-4 items-center" hidden={feedbacks.length === 0}>
              <span className="mr-2">
                  Page {page} of {totalPages}
              </span>
                <button
                    onClick={onPrevious}
                    disabled={page === 1}
                    className="bg-purple-900 text-white px-4 py-2 rounded disabled:opacity-50 mr-2"
                >
                    Prev
                </button>
                <button
                    onClick={onNext}
                    disabled={page === totalPages}
                    className="bg-purple-900 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </>
    );
}

