import { SearchResultInterface } from '../shared/interfaces/search-result.interface';
export interface TextAnalysisFrequencies {
    size: number;
    text: string;
}
export declare class TextAnalysis {
    buildWordFrequencyList(hits: Array<SearchResultInterface>): TextAnalysisFrequencies[];
    cleanText(text: string): string;
    getWords(cleanedText: string): string[] | "";
    strip(words: Array<string>): string[];
}
