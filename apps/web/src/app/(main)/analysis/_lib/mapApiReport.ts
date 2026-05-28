import { type ApiProcessItem, type DiagnosisStatus, type RiskReport } from '@/api/analyze';
import { type DiagnosisResult } from '../_types/analysis.types';

const inferItemStatus = (item: ApiProcessItem): DiagnosisStatus =>
  item.status === '불분명' && (item.title.includes('누락') || item.title.trim() === '') ? '누락' : item.status;

export const mapApiReportToDiagnosisResult = (report: RiskReport, fallbackDate?: string): DiagnosisResult => {
  const sections = report.process_sections.map((s, si) => ({
    id: String(si),
    name: s.display_name,
    items: s.items.map((item, ii) => ({
      id: `${si}_${ii}`,
      status: inferItemStatus(item),
      title: item.title,
      description: item.description,
      actionNote: item.guide,
    })),
  }));

  const allItems = sections.flatMap((s) => s.items);

  return {
    vendorLabel: report.subtitle_fields.company_name,
    areaLabel: `${report.subtitle_fields.pyeong}평 ${report.construction_info.space_type}`,
    analyzedAt: (report.subtitle_fields.analyzed_date ?? fallbackDate ?? new Date().toISOString())
      .slice(0, 10)
      .replace(/-/g, '.'),
    missingCount: allItems.filter((i) => i.status === '누락').length,
    riskCount: allItems.filter((i) => i.status === '불분명').length,
    insufficientCount: allItems.filter((i) => i.status === '중복').length,
    sections,
  };
};
