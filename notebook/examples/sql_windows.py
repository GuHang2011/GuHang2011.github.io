"""Window functions on synthetic daily aggregates, using the standard library."""
import sqlite3

QUERY = """
WITH daily AS (
  SELECT day, team, SUM(amount) AS total
  FROM sales GROUP BY day, team
)
SELECT day, team, total,
       SUM(total) OVER (
         PARTITION BY team ORDER BY day
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total,
       LAG(total) OVER (PARTITION BY team ORDER BY day) AS previous_observed,
       DENSE_RANK() OVER (PARTITION BY day ORDER BY total DESC) AS daily_rank
FROM daily ORDER BY day, team
"""

def analyze():
    with sqlite3.connect(":memory:") as db:
        db.execute("CREATE TABLE sales(day TEXT, team TEXT, amount INTEGER NOT NULL)")
        # Amounts are integer minor units. Team A has no observation on October 2.
        db.executemany("INSERT INTO sales VALUES (?, ?, ?)", [
            ("2026-10-01", "A", 10), ("2026-10-01", "A", 5),
            ("2026-10-01", "B", 15), ("2026-10-02", "B", 7),
            ("2026-10-03", "A", 20), ("2026-10-03", "B", 3),
        ])
        return db.execute(QUERY).fetchall()

if __name__ == "__main__":
    for row in analyze():
        print(row)
