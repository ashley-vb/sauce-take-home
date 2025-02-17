import feedbackStore from "../store/feedback";
import feedbackService from "../service/feedback";

/**
 * GraphQL Resolvers
 */
const resolvers = {
  Query: {
    feedback: (parent: unknown, args: {id: number}) => {
      return feedbackStore.getFeedback(args.id)
    },
    feedbacks: (parent: unknown, args: { page: number; per_page: number }) => {
      return feedbackService.getFeedbackPage(args.page, args.per_page)
    },
  },
  Mutation: {
    createFeedback: (parent: unknown, args: { text: string }) => {
      return feedbackService.createFeedback(args.text)
    },
    createBulkFeedbacks: async (parent: unknown, args: { texts: string[] }) => {
      return args.texts.map((text) => feedbackService.createFeedback(text));
    },
  },
  Feedback: {
    highlights: (parent: { id: number }) => {
      return feedbackStore.getFeedbackHighlights(parent.id);
    }
  }
};

export default resolvers;