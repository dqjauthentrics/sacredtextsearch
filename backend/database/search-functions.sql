DROP FUNCTION searchVerseCount;
CREATE
	FUNCTION searchVerseCount(query TEXT, translationids TEXT) RETURNS INT UNSIGNED DETERMINISTIC READS SQL DATA
BEGIN
	DECLARE v_cnt INT UNSIGNED;
	SELECT COUNT(*)
	INTO v_cnt
	FROM verse v, translation t, book b, tome tm
	WHERE (LENGTH(translationids) = 0 OR FIND_IN_SET(t.id, translationids)) AND
		v.translation_id = t.id AND
		b.id = v.book_id AND
		b.tome_id = tm.id AND
		MATCH(body) AGAINST(CONCAT('+"', REPLACE(query, ' ', '" +"'), '"') IN BOOLEAN MODE) > 0;
	RETURN v_cnt;
END;

DROP PROCEDURE searchVerses;
CREATE PROCEDURE searchVerses(
	IN query TEXT,
	IN translationids TEXT,
	IN offsetrecords INT UNSIGNED,
	IN maxrecords INT UNSIGNED,
	IN ordering TEXT
)
	DETERMINISTIC
	READS SQL DATA
BEGIN
	SET @sql = CONCAT('
        SELECT DISTINCT v.*,
            t.abbreviation AS trans_abbrev, t.name AS trans_name, t.info_url, t.publisher, t.screenshot_url,
            b.name AS book_name, tm.id AS tome_id,
            tm.name AS tome_name, tm.abbreviation AS tome_abbreviation,
            COALESCE(vcv.percent, 0) AS violence,
            COALESCE(vcm.percent, 0) AS myth,
            COALESCE(vcs.percent, 0) AS submission,
            ROUND(MATCH(body) AGAINST(\'+"', REPLACE(query, ' ', '" +"'), '"\' IN BOOLEAN MODE), 3) AS score,
            ROUND(((MATCH(body) AGAINST(\'+"', REPLACE(query, ' ', '" +"'), '"\' IN BOOLEAN MODE) / maxscoretbl.maxscore) * 100) / 20, 3) AS zrank,
            GREATEST(0, ROUND(((((MATCH(body) AGAINST(\'+"', REPLACE(query, ' ', '" +"'), '"\' IN BOOLEAN MODE) / LENGTH(v.body)) / maxscoretbl.maxscore) * 100) * 10), 3)) AS zrankNormalized,
            ((ROUND(((MATCH(body) AGAINST(\'+"', REPLACE(query, ' ', '" +"'), '"\' IN BOOLEAN MODE) / maxscoretbl.maxscore) * 100) / 20, 3) * 0.5) +
             (GREATEST(0, ROUND(((MATCH(body) AGAINST(\'+"', REPLACE(query, ' ', '" +"'), '"\' IN BOOLEAN MODE) / LENGTH(v.body)) / maxscoretbl.maxscore) * 100, 3) * 10) * 0.5)) AS combinedRank,
            getChapterName(b.id,v.chapter_number) AS chapterName,
            getChapterTitle(b.id,v.chapter_number) AS chapterTitle
        FROM translation t,
            book b,
            tome tm,
            (SELECT MAX(MATCH(body) AGAINST(\'', query, '\')) AS maxscore FROM verse WHERE MATCH(body) AGAINST(\'', query, '\')) AS maxscoretbl,
            verse v
            LEFT JOIN verse_characterization vcv ON v.id = vcv.verse_id AND vcv.characterization_id = \'V\'
            LEFT JOIN verse_characterization vcm ON v.id = vcm.verse_id AND vcm.characterization_id = \'M\'
            LEFT JOIN verse_characterization vcs ON v.id = vcs.verse_id AND vcs.characterization_id = \'S\'
        WHERE (LENGTH(\'', translationids, '\') = 0 OR FIND_IN_SET(t.id,\'', translationids, '\')) AND
            v.translation_id = t.id AND
            b.id = v.book_id AND
            b.tome_id = tm.id AND
            MATCH(body) AGAINST(\'+"', REPLACE(query, ' ', '" +"'), '"\' IN BOOLEAN MODE) > 0
        ORDER BY ', ordering, '
        LIMIT ', maxrecords, ' OFFSET ', offsetrecords, ';');

	PREPARE stmt FROM @sql;
	EXECUTE stmt;
END;
