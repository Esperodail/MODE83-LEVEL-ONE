/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface TrainingSession {
  id: string;
  title: string;
  duration: string;
  description: string;
  modules: string[];
}

export interface Project {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  itchIoUrl: string;
  downloadUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  PROGRAM = 'program',
  PROJECTS = 'projects',
  VIDEOS = 'videos',
}
