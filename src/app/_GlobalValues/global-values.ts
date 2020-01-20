export const MinimumPasswordLength: number = 6;
export enum PrestartValues {
    completed,
    skipped,
}

export enum CloseoutTaskValues {
    completed,
    skipped,
}

export enum TypeOfInput {
    inputBox,
    dropdownBox,
}

export interface taskCheck {
    name: string,
    true: Number,
    false: Number,
}

export const ValidTriggerValue = '0'
export const AlertTriggerValue = '1'
export const AlarmTriggerValue = '2'

export interface CompareValueReturn {
    newIcon: string;
    trigger: string;
}


export const New: string = 'New';
export const NewTasks: string = 'NewTasks';
export const NewData: string = 'NewData';

export enum TrimType {
    both,
    start,
    end,
}