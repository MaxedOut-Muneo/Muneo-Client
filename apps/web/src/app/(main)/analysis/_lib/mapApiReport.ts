import { type DiagnosisResult, type RiskReport } from '../_types/analysis.types';

export const mapApiReportToDiagnosisResult = (report: RiskReport, fallbackDate?: string): DiagnosisResult => ({
  vendorLabel: report.subtitle_fields.company_name,
  areaLabel: `${report.subtitle_fields.pyeong}평 ${report.construction_info.space_type}`,
  analyzedAt: (report.subtitle_fields.analyzed_date ?? fallbackDate ?? new Date().toISOString())
    .slice(0, 10)
    .replace(/-/g, '.'),
  missingCount: report.summary.chips.누락,
  riskCount: report.summary.chips.불분명,
  insufficientCount: report.summary.chips.중복,
  sections: report.process_sections.map((s, si) => ({
    id: String(si),
    name: s.display_name,
    items: s.items.map((item, ii) => ({
      id: `${si}_${ii}`,
      status: item.status,
      title: item.title,
      description: item.description,
      actionNote: item.guide,
    })),
  })),
});
