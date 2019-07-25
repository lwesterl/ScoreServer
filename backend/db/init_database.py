'''
Use this script to init database which is used by the express backend.
Note: obviously being an init script this must be run only once to
create correct tables etc.
Author: Lauri Westerholm
'''

import sqlite3 as sql
import sys

# Database related constants
DATABASE_PATH = 'database.db'
INIT_SQL_PATH = 'tables.sql'


'''
Create new database
return: database connection
Exit on error
'''
def create_database():
    try:
        conn = sql.connect(DATABASE_PATH)
        return conn
    except Error as e:
        print(e)
        print('Fatal error, exit')
        sys.exit(-1)

'''
Init database based on commands in INIT_SQL_PATH file
'''
def init_db(conn):
    cursor = conn.cursor()

    # Create tables defined in INIT_SQL_PATH
    try:
        content = None
        with open(INIT_SQL_PATH, 'r') as file:
            content = file.read()

        queries = content.split(';')
        for query in queries:
            try:
                cursor.execute(query)
            except sql.OperationalError as e:
                print(e)
        conn.commit()
    except (IOError, TypeError) as e:
        print(e)
        print("Can't init database")

'''
Entry point to the script
'''
def main():
    conn = create_database()
    init_db(conn)
    try:
        conn.close()
    except Error as e:
        print(e)
        sys.exit(-1)


if __name__ == '__main__':
    main()
