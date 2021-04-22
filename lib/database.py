import psycopg2

class Database:
    def __init__(self, url):
        self.url = DATABASE_URL
        self.con = psycopg2.connect(DATABASE_URL, sslmode='require')
        
        self.con.execute(f'''CREATE TABLE IF NOT EXISTS Feed (
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
            return self.con.execute(f'SELECT {indicator} FROM {table} WHERE {expression}').fetchone()
        except:
            return None

    def get_all(self, table, indicator, expression=True):
        try:
            return self.cur.execute(f'SELECT {indicator} FROM {table} WHERE {expression}').fetchall()
        except:
            return []

    def set(self, table, indicator, expression=True):
        try:
            self.con.execute(f'UPDATE {table} SET {indicator} WHERE {expression}')
        except:
            return 'table not exists'
        return self.con.commit()

    def push(self, table, data_list):
        self.con.execute(f'INSERT INTO {table} VALUES (?{", ?" * ( len(data_list) - 1 )})', data_list)
        self.con.commit()

    def push_many(self, table, data_list):
        if ( type(data_list) == type([]) or type(data_list) == type(()) ) and type(data_list[0]) != type([]) and type(data_list[0]) != type(()):
            data_list = (data_list)
        self.con.executemany(f'INSERT INTO {table} VALUES (?{", ?" * ( len(data_list) - 1 )})', data_list)
        self.con.commit()

    def close(self):
        self.con.close()
