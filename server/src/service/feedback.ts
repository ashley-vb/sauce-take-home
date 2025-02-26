import feedbackStore from "../store/feedback";
import prompt from "../ai/prompt";
import {Feedback} from "../store/model";
import { EventEmitter } from 'events';

const feedbackEmitter = new EventEmitter();

feedbackEmitter.on('feedbackReceived', async (feedback: Feedback) => {
    await processFeedback(feedback);
});

const processFeedback = async (feedback: Feedback) => {
    let analysisResult;
    try {
        analysisResult = await prompt.runFeedbackAnalysis(feedback.text);
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
}

/**
 * Creates a feedback entry.
 * @param text The feedback to create
 */
const createFeedback = async (text: string) => {
    const feedback = await feedbackStore.createFeedback(text) as Feedback;

    feedbackEmitter.emit('feedbackReceived', feedback);
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