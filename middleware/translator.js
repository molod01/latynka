const lower = {
	а: 'a',
	б: 'b',
	в: 'v',
	г: 'g',
	ґ: 'ğ',
	д: 'd',
	е: 'e',
	є: 'je',
	ж: 'ž',
	з: 'z',
	и: 'y',
	і: 'i',
	ї: 'ji',
	й: 'j',
	к: 'k',
	л: 'l',
	м: 'm',
	н: 'n',
	о: 'o',
	п: 'p',
	р: 'r',
	с: 's',
	т: 't',
	у: 'u',
	ф: 'f',
	х: 'h',
	ц: 'c',
	ч: 'č',
	ш: 'š',
	щ: 'šč',
	ь: "'",
	ю: 'ju',
	я: 'ja',
};
const upper = {
	А: 'A',
	Б: 'B',
	В: 'V',
	Г: 'G',
	Ґ: 'Ğ',
	Д: 'D',
	Е: 'E',
	Є: 'JE',
	Ж: 'Ž',
	З: 'Z',
	И: 'Y',
	І: 'I',
	Ї: 'JI',
	Й: 'J',
	К: 'K',
	Л: 'L',
	М: 'M',
	Н: 'N',
	О: 'O',
	П: 'P',
	Р: 'R',
	С: 'S',
	Т: 'T',
	У: 'U',
	Ф: 'F',
	Х: 'H',
	Ц: 'C',
	Ч: 'Č',
	Ш: 'Š',
	Щ: 'ŠČ',
	Ь: "'",
	Ю: 'JU',
	Я: 'JA',
};
const cyrillicToLatin = (cyrillic) => {
	let latin = cyrillic;
	for (const [key, value] of Object.entries(lower)) {
		latin = latin.replaceAll(key, value);
	}
	for (const [key, value] of Object.entries(upper)) {
		latin = latin.replaceAll(key, value);
	}
	return latin;
};
const priorityLatin = {
	є: 'je',
	ї: 'ji',
	щ: 'šč',
	ю: 'ju',
	я: 'ja',
};

const latinToCyrillic = (latin) => {
	let cyrillic = latin;
	for (const [key, value] of Object.entries(priorityLatin)) {
		cyrillic = cyrillic.replaceAll(value, key);
	}
	for (const [key, value] of Object.entries(lower)) {
		cyrillic = cyrillic.replaceAll(value, key);
	}
	for (const [key, value] of Object.entries(upper)) {
		cyrillic = cyrillic.replaceAll(value, key);
	}
	return cyrillic;
};

export const translate = (req, res, next) => {
	const cyrillic = req.body.cyrillic;
	const latin = req.body.latin;

	const translationDirection = req.body.translationDirection;
	if (translationDirection === 'toLatin') {
		req.cyrillic = cyrillic;
		req.latin = cyrillicToLatin(cyrillic);
	} else if (translationDirection === 'toCyrillic') {
		req.cyrillic = latinToCyrillic(latin);
		req.latin = latin;
	} else throw new Error('Unknown translate direction');
	req.direction = translationDirection;
	next();
};
