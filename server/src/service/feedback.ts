import feedbackStore from "../store/feedback";
import prompt from "../ai/prompt";

/**
 * Creates a feedback entry.
 * @param text The feedback to create
 */
const createFeedback = async (text: string) => {
    const feedback = await feedbackStore.createFeedback(text);

    let analysisResult;
    try {
        analysisResult = prompt.runFeedbackAnalysis(feedback.text);
        console.debug('Analysis result retrieved successfully', analysisResult);
    } catch (error: any) {
        console.error('Failed to run feedback analysis for feedback:', feedback, error);
        throw new Error(`Error running analysis: ${error.message}`);
    }
    
    if (analysisResult.highlights.length > 0) {
        analysisResult.highlights.forEach((highlight) => {
            feedbackStore.createHighlight({
                feedbackId: feedback.id,
                highlightQuote: highlight.quote,
                highlightSummary: highlight.summary
            }).catch(error => {
                console.error(`Failed to create highlight for quote: ${highlight.quote}, summary: ${highlight.summary}`, error);
            });
        });
    } else {
        console.debug('No highlights found for feedback analysis.');
    }

    return feedback;
}

/**
 * Gets a page of feedback entries
 * @param page The page number
 * @param perPage The number of entries per page
 */
const getFeedbackPage = async (page: number, perPage: number) => {
    const values = await feedbackStore.getFeedbackPage(page, perPage);
    const count = feedbackStore.countFeedback();
    return {values, count};
}

export default {
    createFeedback,
    getFeedbackPage,
}