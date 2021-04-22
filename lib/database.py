import sqlite3

class DB:
    def __init__(self, filename):
        self.filename = filename
        self.sql = sqlite3.connect(filename, check_same_thread=False)
        
        self.sql.execute(f'''CREATE TABLE IF NOT EXISTS Feed (
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

    def get(self, table, indicator, expression=True):
        try:
            return self.sql.execute(f'SELECT {indicator} FROM {table} WHERE {expression}').fetchone()
        except:
            return None

    def get_all(self, table, indicator, expression=True):
        try:
            return self.cur.execute(f'SELECT {indicator} FROM {table} WHERE {expression}').fetchall()
        except:
            return []

    def set(self, table, indicator, expression=True):
        try:
            self.sql.execute(f'UPDATE {table} SET {indicator} WHERE {expression}')
        except:
            return 'table not exists'
        return self.sql.commit()

    def push(self, table, data_list):
        self.sql.execute(f'INSERT INTO {table} VALUES (?{", ?" * ( len(data_list) - 1 )})', data_list)
        self.sql.commit()

    def push_many(self, table, data_list):
        if ( type(data_list) == type([]) or type(data_list) == type(()) ) and type(data_list[0]) != type([]) and type(data_list[0]) != type(()):
            data_list = (data_list)
        self.sql.executemany(f'INSERT INTO {table} VALUES (?{", ?" * ( len(data_list) - 1 )})', data_list)
        self.sql.commit()

    def close(self):
        self.sql.close()
