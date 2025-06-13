import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumeData } from '@/types/resume';
import { downloadFile } from '@/utils';

export async function generatePDF(elementId: string, filename: string = 'resume.pdf'): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Resume preview element not found');
    }

    // Create canvas from the resume preview
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add image to PDF
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add new pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download the PDF
    const pdfBlob = pdf.output('blob');
    downloadFile(pdfBlob, filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}

export function validateResumeData(data: ResumeData): string[] {
  const errors: string[] = [];

  if (!data.personalInfo.name.trim()) {
    errors.push('Name is required');
  }

  if (!data.personalInfo.email.trim()) {
    errors.push('Email is required');
  }

  if (data.personalInfo.email && !isValidEmail(data.personalInfo.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!data.summary.trim()) {
    errors.push('Professional summary is required');
  }

  if (data.experience.length === 0) {
    errors.push('At least one work experience entry is required');
  }

  if (data.education.length === 0) {
    errors.push('At least one education entry is required');
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
