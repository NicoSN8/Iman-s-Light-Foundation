import type { Metadata } from 'next';
import DataMetricsContent from './DataMetricsContent';

export const metadata: Metadata = {
  title: 'Data & Metrics',
  description:
    "See the measurable impact of Iman's Light Foundation's fentanyl awareness workshops through survey data and program metrics.",
};

export default function DataMetricsPage() {
  return <DataMetricsContent />;
}
