rg='one|two|three|four|five|six|seven|eight|nine'
$('*').textContent.trim().split`\n`.map(e => [...e.matchAll(new RegExp(`((?=(${rg}))|\\d)` ,'gm'))].flat().filter(f => f).map(g => +g || rg.split`|`.indexOf(g) + 1)).map(e => +(`${e.at(0)}${e.at(-1)}`)).reduce((a, b) => a + b, 0)

