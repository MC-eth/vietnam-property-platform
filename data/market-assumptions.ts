// Indicative scenario assumptions for the district price-trend forecast.
//
// IMPORTANT: These are illustrative MVP assumptions for scenario modelling only.
// They are NOT live data, NOT official statistics, and NOT a forecast of guaranteed
// value. Verify against reputable macroeconomic and FX sources before public launch.
// Adjust the values below to tune the indicative five-year projection.

export type MarketForecastAssumptions = {
  // Assumed average annual nominal price growth (inflation-influenced), e.g. 0.04 = ~4%/yr.
  assumedAnnualInflationRate: number;
  // Assumed average annual currency adjustment applied to the HKD/foreign-buyer view,
  // reflecting indicative VND movement against USD/HKD. Negative = mild annual depreciation
  // working against the foreign buyer, e.g. -0.02 = ~2%/yr.
  assumedAnnualFxAdjustment: number;
};

export const MARKET_FORECAST_ASSUMPTIONS: MarketForecastAssumptions = {
  assumedAnnualInflationRate: 0.04,
  assumedAnnualFxAdjustment: -0.02,
};

export const FORECAST_YEARS = 5;
