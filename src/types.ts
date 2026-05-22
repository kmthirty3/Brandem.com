/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceId = 'tvc' | 'pr' | 'strategy' | 'political' | 'full';

export interface GearItem {
  id: string;
  name: string;
  category: string;
  badge?: string;
  spec: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  statNumber: string;
  statLabel: string;
  banglaContext?: string;
}

export interface LeadRequest {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: ServiceId | '';
  challenge: string;
}

export interface Lead extends LeadRequest {
  id: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'contacted';
  aiConcept?: string; // Markdown/formatted AI evaluation
}

export interface AiBriefResponse {
  briefId: string;
  brandName: string;
  pitchSummary: string;
  visualMetaphor: string;
  banglaHook: string;
  tacticalPlan: string[];
}
