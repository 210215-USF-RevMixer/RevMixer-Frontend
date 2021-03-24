import { Pattern } from "./Pattern";
import { Sample } from "./Sample";
import { SavedProject } from "./SavedProject";


export interface Track
{
    ID: number,
    projectId: number,
    sampleId: number,
    patternId: number,

    savedProject: SavedProject,
    sample: Sample,
    pattern: Pattern
}