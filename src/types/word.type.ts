export default interface Word {
    chinese: string;
    pinyin: string;
    english: string;
    level: number;
    id: number;
    [key: string]: any;
}