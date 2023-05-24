export enum InstructionStep {
  ListInstructions,
  Instruction,
  Step,
}

export enum ActionType {
  Camera,
  Rotation,
  Explode,
  Section,
  Hide,
  Annotation,
  RestoreView,
  FitToView,
  Drag,
}

export interface InstructionI {
  index?: number;
  title: string;
  description: string;
  steps: StepI[];
}

export interface StepI {
  index?: number;
  img: string;
  description: string;
  actions: ActionI[];
}

export interface ActionI {
  index: number;
  type: number;
  value: any;
}
