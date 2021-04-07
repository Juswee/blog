class News:
    def __init__(self, idx, title, datetime, text, tags, type):
        self.idx = idx
        self.title = title
        self.datetime = datetime
        self.text = text
        self.tags = [el.strip() for el in tags.split(';')]
        self.type = type

    def description(self):
        lst = self.text.split(' ')
        leng = min([len(lst), 30])
        return str(lst[:leng]).replace(',', '').replace("'", '').strip('[]')
