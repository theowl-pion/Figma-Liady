export type DecisionState =
  | "pending"
  | "processing"
  | "approved"
  | "rejected"
  | "under_review";

export type ActionType = "approve" | "reject" | "review";

// Insight Inbox Types
export type ConfidenceLevel = "High" | "Medium" | "Low";

export type InsightStatus = "new" | "saved" | "dismissed";

export interface Insight {
  id: string;
  title: string;
  summary: string;
  confidence: ConfidenceLevel;
  confidenceExplanation: string;
  supportingSignals: string[];
  nextStep?: string;
  status: InsightStatus;
}
