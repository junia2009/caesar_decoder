// Caesar暗号のデコード処理
function caesarDecode(text, shift) {
    return text.replace(/[a-zA-Z]/g, function(c) {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - base - shift + 26) % 26 + base);
    });
}


// 全シフト値で復号
function caesarAllDecodes(text) {
    const results = [];
    for (let shift = 1; shift <= 25; shift++) {
        results.push({
            shift,
            decoded: caesarDecode(text, shift)
        });
    }
    return results;
}


// 英語らしさ判定用の簡易英単語リスト
const COMMON_WORDS = [
    'the','be','to','of','and','a','in','that','have','i','it','for','not','on','with','he','as','you','do','at',
    'this','but','his','by','from','they','we','say','her','she','or','an','will','my','one','all','would','there','their','what','so','up','out','if','about','who','get','which','go','me'
];

function englishScore(text) {
    const words = text.toLowerCase().split(/[^a-z]+/);
    let score = 0;
    for (const w of words) {
        if (COMMON_WORDS.includes(w)) score++;
    }
    return score;
}

document.getElementById('decodeBtn').onclick = function() {
    const input = document.getElementById('inputText').value;
    const results = caesarAllDecodes(input);
    // [Shift n]のあとに改行を入れず、1行で出力
    const output = results.map(r => `[Shift ${r.shift}] ${r.decoded}`).join('\n\n');
    document.getElementById('outputText').value = output;
    document.getElementById('outputChars').textContent = `${output.length} CHARS`;
};

document.getElementById('clearBtn').onclick = function() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
    document.getElementById('outputChars').textContent = '0 CHARS';
};

document.getElementById('copyBtn').onclick = function() {
    const output = document.getElementById('outputText');
    output.select();
    document.execCommand('copy');
};
