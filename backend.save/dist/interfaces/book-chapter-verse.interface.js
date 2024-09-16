"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BookChapterVerse = /** @class */ (function () {
    function BookChapterVerse() {
    }
    BookChapterVerse.prototype.parse = function (query) {
        if (query.indexOf(':') >= 0) {
            var parts = query.split(':');
            if (parts && parts.length === 3) {
                var book = parts[0];
                var chapter = Number(parts[1]);
                var verse = Number(parts[2]);
                return { book: book, chapter: chapter, verse: verse };
            }
        }
        return null;
    };
    return BookChapterVerse;
}());
exports.BookChapterVerse = BookChapterVerse;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnRlcmZhY2VzL2Jvb2stY2hhcHRlci12ZXJzZS5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQTtJQUFBO0lBYUEsQ0FBQztJQVpVLGdDQUFLLEdBQVosVUFBYSxLQUFhO1FBQ3RCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekIsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDN0IsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFNLE9BQU8sR0FBVyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQU0sS0FBSyxHQUFXLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUM7YUFDdkQ7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCx1QkFBQztBQUFELENBYkEsQUFhQyxJQUFBO0FBYlksNENBQWdCIiwiZmlsZSI6ImludGVyZmFjZXMvYm9vay1jaGFwdGVyLXZlcnNlLmludGVyZmFjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgQm9va0NoYXB0ZXJWZXJzZUludGVyZmFjZSB7XG4gICAgYm9vazogc3RyaW5nO1xuICAgIGNoYXB0ZXI6IG51bWJlcjtcbiAgICB2ZXJzZTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgQm9va0NoYXB0ZXJWZXJzZSB7XG4gICAgcHVibGljIHBhcnNlKHF1ZXJ5OiBzdHJpbmcpOiBCb29rQ2hhcHRlclZlcnNlSW50ZXJmYWNlIHwgbnVsbCB7XG4gICAgICAgIGlmIChxdWVyeS5pbmRleE9mKCc6JykgPj0gMCkge1xuICAgICAgICAgICAgY29uc3QgcGFydHMgPSBxdWVyeS5zcGxpdCgnOicpO1xuICAgICAgICAgICAgaWYgKHBhcnRzICYmIHBhcnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvb2sgPSBwYXJ0c1swXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFwdGVyOiBudW1iZXIgPSBOdW1iZXIocGFydHNbMV0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZlcnNlOiBudW1iZXIgPSBOdW1iZXIocGFydHNbMl0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7Ym9vazogYm9vaywgY2hhcHRlcjogY2hhcHRlciwgdmVyc2U6IHZlcnNlfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iXX0=
