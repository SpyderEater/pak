import apiCall from './api'

export async function getReports() {
  return apiCall('/reports')
}

export async function getReportById(reportId) {
  return apiCall(`/reports/${reportId}`)
}

export function buildReportDownloadUrl(driveFileId) {
  return `https://drive.google.com/uc?export=download&id=${driveFileId}`
}

export function buildReportPreviewUrl(driveFileId) {
  return `https://drive.google.com/file/d/${driveFileId}/preview`
}

export default {
  getReports,
  getReportById,
  buildReportDownloadUrl,
  buildReportPreviewUrl,
}
