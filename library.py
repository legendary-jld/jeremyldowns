import codecs, translitcodec # Used in encodings


def slugify(text, key=None, delim=u'-'):
    """Generates a clean ASCII-only slug."""
    restricted_chars = [":",";","'",'"',"?","&","!","(",")",".","/","+","=","$","@","#","%","*"]
    result = []
    for char in restricted_chars:
        text = text.replace(char, '')
    for word in _punct_re.split(text.lower()):
        word = codecs.encode(word, 'translit/long')
        if word:
            result.append(word)
    if key:
        return str(delim.join(result)) + '-' + str(key)
    else:
        return str(delim.join(result))
