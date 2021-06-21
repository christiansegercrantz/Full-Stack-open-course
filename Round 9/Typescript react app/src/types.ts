export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CoursePartWithDesc extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDesc {
  type: "normal";
}

interface CourseSubmissionPart extends CoursePartWithDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDesc {
  type: 'special';
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;