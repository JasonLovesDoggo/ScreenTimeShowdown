export interface GradeThreshold {
    letter: string;
    threshold: number;
}

const thresholds: Array<GradeThreshold> = [
    {letter: "A+", threshold: 90},
    {letter: "A", threshold: 85},
    {letter: "A-", threshold: 80},
    {letter: "B+", threshold: 77},
    {letter: "B", threshold: 73},
    {letter: "B-", threshold: 70},
    {letter: "C+", threshold: 67},
    {letter: "C", threshold: 63},
    {letter: "C-", threshold: 60},
    {letter: "D+", threshold: 57},
    {letter: "D", threshold: 53},
    {letter: "D-", threshold: 50},
    {letter: "F", threshold: 0},
];

export default function getLetterGrade(percent: number) {
    let letterGrade: string = "";
    thresholds.forEach((threshold: GradeThreshold) => {
        if (!letterGrade && threshold.threshold <= percent) {
            letterGrade = threshold.letter;
        }
    });
    if (!letterGrade) {
        throw new Error("Invalid percentage inputted");
    }
    return letterGrade;
}

export const getArticle = (proceedingLetter: string): string => {
    const vowels: Array<string> = ['A', 'E', 'I', 'O', 'U'];
    return vowels.includes(proceedingLetter[0].toUpperCase()) ? "an" : "a";
}