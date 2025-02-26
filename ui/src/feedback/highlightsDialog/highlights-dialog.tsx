import {Feedback} from "../api.ts";


export interface HighlightDialogProps {
    /*
     * The feedback object
     */
    feedback: Feedback;
    /*
     * Flag to determine whether the dialog is visible
     */
    showDialog: boolean
    /*
     * The callback on closing of the dialog
     */
    onClose(showDialog: boolean): void;
}

export const HighlightsDialog = ({feedback, showDialog, onClose}: HighlightDialogProps): React.JSX.Element => {

    const handleClose = () => {
        onClose(false);
    };

    return (
        <dialog
            open={showDialog}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-content"
            className="w-[600px] p-5 bg-indigo-500 rounded-lg shadow-lg overflow-y-auto"
        >
            <div className="relative flex flex-col items-start">
                <button
                    onClick={handleClose}
                    className="text-darksalmon bg-transparent border-none text-xl absolute right-4 cursor-pointer transition-colors duration-300"
                    aria-label="Close dialog"
                >
                    X
                </button>
                <h2 id="dialog-title" className="text-darksalmon text-xl font-bold mb-4">{feedback.text}</h2>
                <div id="dialog-content" className="mt-3">
                    {feedback.highlights && feedback.highlights.length > 0 ? (
                        feedback.highlights.map((highlight, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-darksalmon text-lg font-bold">{highlight.quote}</h3>
                                <p className="text-indianred text-base">{highlight.summary}</p>
                            </div>
                        ))
                    ) : (
                        <p>No highlights available.</p>
                    )}
                </div>
            </div>
        </dialog>
    );
}