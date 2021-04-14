import sqlite3

class DB:
    def __init__(self, filename):
        self.filename = filename
        self.sql = sqlite3.connect(filename, check_same_thread=False)
        self.cur = self.sql.cursor()

    def get(self, table, indicator, expression=True):
        try:
            self.cur.execute(f'SELECT {indicator} FROM {table} WHERE {expression}')
        except:
            return []
        return self.cur.fetchone()

    def get_all(self, table, indicator, expression=True):
        try:
            self.cur.execute(f'SELECT {indicator} FROM {table} WHERE {expression}')
        except:
            return []
        return self.cur.fetchall()

    def set(self, table, indicator, expression=True):
        try:
            self.cur.execute(f'UPDATE {table} SET {indicator} WHERE {expression}')
        except:
            return 'table not exists'
        return self.sql.commit()

    def push(self, table, data_list):
        self.cur.execute(f'''CREATE TABLE IF NOT EXISTS {table} (
          enum INTEGER PRIMARY KEY,
          id INTEGER,
          title TEXT,
          text TEXT,
          tags TEXT,
          link TEXT,
          img TEXT,
          timestamp TEXT,
          type TEXT
        )''')
        self.cur.execute(f'INSERT INTO {table} VALUES (?{", ?" * ( len(data_list) - 1 )})', data_list)
        self.sql.commit()

    def push_many(self, table, data_list):
        if ( type(data_list) == type([]) or type(data_list) == type(()) ) and type(data_list[0]) != type([]) and type(data_list[0]) != type(()):
            data_list = (data_list)
        self.cur.execute(f'''CREATE TABLE IF NOT EXISTS {table} (
          enum INTEGER PRIMARY KEY,
          id INTEGER,
          title TEXT,
          text TEXT,
          tags TEXT,
          link TEXT,
          img TEXT,
          timestamp TEXT,
          type TEXT
        )''')
        self.cur.executemany(f'INSERT INTO {table} VALUES (?{", ?" * ( len(data_list) - 1 )})', data_list)
        self.sql.commit()

    def close(self):
        self.sql.close()
