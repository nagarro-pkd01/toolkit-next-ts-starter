import type {
  MetricRating,
  PerformanceAlert,
  PerformanceMetricName,
} from "@/types/performanceTypes";
import { getRecommendations } from "@/utils/performance/getRecommendations";

type CreateAlertInput = {
  metric: PerformanceMetricName;
  rating: Exclude<MetricRating, "good">;
  unit: string;
  value: number;
};

export const createPerformanceAlert = ({
  metric,
  rating,
  unit,
  value,
}: CreateAlertInput): PerformanceAlert => {
  return {
    detectedAt: new Date().toISOString(),
    id: `${metric}-${rating}-${Date.now()}`,
    metric,
    rating,
    recommendations: getRecommendations(metric, rating),
    unit,
    value,
  };
};
