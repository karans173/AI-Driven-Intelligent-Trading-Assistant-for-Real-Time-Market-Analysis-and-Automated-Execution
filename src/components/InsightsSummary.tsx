import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

type Props = {
  data: any;
};

const InsightsSummary = ({ data }: Props) => {
  if (!data) return null;

  const {
    historical_ml,
    latest_data,
    lstm_forecast,
    sentiment_analysis,
    trading_signal,
  } = data;

  return (
    <section className="py-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Trading Signal */}
        <Card className="bg-dark-100 border border-white/10">
          <CardHeader>
            <CardTitle className="text-lime-400">AI Trading Signal</CardTitle>
            <CardDescription className="text-white/70">
              Suggested Action:{" "}
              <span className="font-semibold text-white">
                {trading_signal.action.toUpperCase()}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-white space-y-2">
            <p>
              Confidence:{" "}
              <strong>{(trading_signal.confidence * 100).toFixed(1)}%</strong>
            </p>
            <p>
              Sentiment Signal: {trading_signal.sentiment_signal.toFixed(3)}
            </p>
            <p>Technical Signal: {trading_signal.technical_signal}</p>
            <p>Combined Signal: {trading_signal.combined_signal.toFixed(2)}</p>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="bg-dark-100 border border-white/10">
          <CardHeader>
            <CardTitle className="text-pink-400">Sentiment Analysis</CardTitle>
            <CardDescription className="text-white/70">
              {sentiment_analysis.overall_sentiment}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-white space-y-2">
            <p>
              Avg Score: {sentiment_analysis.avg_sentiment_score.toFixed(3)}
            </p>
            <p>
              Positive Ratio:{" "}
              {(sentiment_analysis.positive_ratio * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        {/* LSTM Forecast */}
        <Card className="bg-dark-100 border border-white/10">
          <CardHeader>
            <CardTitle className="text-cyan-400">LSTM Forecast</CardTitle>
            <CardDescription className="text-white/70">
              {lstm_forecast.trend}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-white space-y-2">
            <p>Percent Change: {lstm_forecast.percent_change.toFixed(2)}%</p>
            <p>Volatility: {lstm_forecast.volatility.toFixed(2)}</p>
          </CardContent>
        </Card>

        {/* Historical ML */}
        <Card className="bg-dark-100 border border-white/10">
          <CardHeader>
            <CardTitle className="text-yellow-400">Historical Model</CardTitle>
            <CardDescription className="text-white/70">
              Accuracy: {(historical_ml.accuracy * 100).toFixed(1)}%
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-white space-y-2">
            <p>Ticker: {historical_ml.ticker}</p>
            <p>Period: {historical_ml.period_days} days</p>
            <p>Features: {historical_ml.features_used.join(", ")}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InsightsSummary;
