import {Directive, ElementRef, Input, OnInit,} from '@angular/core';
import * as D3 from 'd3';

declare let d3: any;

export interface WordCloudOptions {
    settings?: {
        minFontSize?: number,
        maxFontSize?: number,
        fontFace?: string,
        fontWeight?: string,
        spiral?: string,
    };
    margin?: {
        top: number,
        right: number,
        bottom: number,
        left: number
    };
    labels?: boolean;
}

export interface WordCloudData {
    text: string;
    size: number;
    color?: string;
}

@Directive({selector: 'div[WordCloud]', exportAs: 'word-cloud'})
export class WordCloudDirective implements OnInit {
    @Input() options: WordCloudOptions = {};
    @Input() width: number = 250;
    @Input() height: number = 200;
    @Input() wordData: WordCloudData[] = [];
    @Input() color: string[] = ['#2BAAE2', '#FF6B8D', '#cecece', '#003E5D', '#22BAA0', '#cecece'];

    temp: Array<WordCloudData> = [];

    private old_min: number = 0;
    private old_max: number = 0;
    private svg: any;
    private element: ElementRef;

    public constructor(element: ElementRef) {
        this.element = element;
    }

    ngOnInit() {
        this.update();
    }

    public update(): void {
        this.removeElementsByClassName('wordcloud-svg');
        this.removeElementsByClassName('wordcloud-tooltip');
        this.setup();
        this.buildSVG();
        this.populate();
    }

    private getWordSize(word: string): number {
        const indexOfWord = this.wordData.findIndex(i => i.text === word);
        if (indexOfWord === -1) {
            return 0;
        }
        return this.wordData[indexOfWord].size;
    }

    private removeElementsByClassName(classname: string): void {
        const elements = this.element.nativeElement.getElementsByClassName(classname);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    private roundNumber(): void {
        const temp = this.wordData.map(d => {
            if (d.color) {
                return {text: d.text, size: this.scale(d.size), color: d.color};
            }
            return {
                text: d.text,
                size: this.scale(d.size),
                color: this.color[Math.floor(Math.random() * this.color.length)]
            };

        });
        this.temp.length = 0;
        this.temp.push(...temp);
    }

    private scale(inputY: number): number {
        const x = inputY - this.old_min;
        const y = this.old_max - this.old_min;
        const percent = x / y;
        return percent * (50 - 10) + 10;
    }

    private updateMaxMinValues(): void {
        this.old_min = Number.MAX_VALUE;
        this.old_max = Number.MIN_VALUE;
        this.wordData.map(res => {
            if (res.size < this.old_min) {
                this.old_min = res.size;
            }
            if (res.size > this.old_max) {
                this.old_max = res.size;
            }
        });
    }

    private setup(): void {
        if (!this.width && this.options.margin) {
            this.width = 200 - this.options.margin.right - this.options.margin.left;
        }
        if (!this.height && this.options.margin) {
            this.height = this.width * 0.5 - this.options.margin.top - this.options.margin.bottom;
        }
    }

    private buildSVG(): void {
        try {
            if (!this.options.margin) {
                this.options.margin = {top: 0, left: 0, bottom: 0, right: 0};
            }
            if (!this.width) {
                this.width = 250;
            }
            if (!this.height) {
                this.height = 200;
            }
            this.svg = D3.select(this.element.nativeElement)
                         .append('svg')
                         .attr('class', 'wordcloud-svg')
                         .attr('width', this.width + this.options.margin.left + this.options.margin.right)
                         .attr('height', this.height + this.options.margin.top + this.options.margin.bottom)
                         .append('g')
                         .attr('transform', 'translate(' + ~~(this.width / 2) + ',' + ~~(this.height / 2) + ')');
        } catch (exception) {
            console.warn('word cloud exception:', exception);
        }
    }

    private populate(): void {
        try {
            if (this.svg) {
                this.svg.selectAll('*').remove();
            }
            if (!this.options.settings) {
                this.options.settings = {fontFace: 'Roboto', fontWeight: 'normal', spiral: 'archimedean'};
            }
            this.updateMaxMinValues();
            this.roundNumber();
            d3.layout.cloud()
              .size([this.width, this.height])
              .words(this.temp)
              .padding(5)
              .rotate(() => (~~(Math.random() * 2) * 90))
              .font(this.options.settings.fontFace)
              .fontWeight(this.options.settings.fontWeight)
              .fontSize((d: any) => {
                  return d ? d.size : '12px';
              })
              .timeInterval(100)
              .on('end', () => {
                  this.drawWordCloud(this.temp);
              })
              .start();
        } catch (exception) {
            console.warn('word cloud exception:', exception);
        }
    }

    private drawWordCloud(words: WordCloudData[]): void {
        const self = this;
        try {
            this.svg
                .selectAll('text')
                .data(words)
                .enter()
                .append('text')
                .style('font-size', (d: any) => {
                    return d ? d.size + 'px' : '12px';
                })
                .style('fill', (d: any) => {
                    return d ? d.color : 'gray';
                })
                .attr('mdTooltip', 'ddd')
                .attr('text-anchor', 'middle')
                .attr('transform', (d: any) => {
                    return d ? 'translate(' + [d.x || this.rand(), d.y || this.rand()] + ')rotate(' + d.rotate + ')' : 'none'
                })
                .attr('class', 'word-cloud')
                .text((d: any) => {
                    return d ? d.text : '';
                });
        } catch (exception) {
            console.warn('word cloud exception:', exception);
        }
    }

    private rand(): number {
        return Math.floor(Math.random() * 200) + 1;
    }
}
