-- Execute este SQL no editor SQL do Supabase (Dashboard > SQL Editor)
CREATE TABLE search_history (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  city TEXT NOT NULL,
  temperature TEXT,
  weather_desc TEXT,
  humidity TEXT,
  wind_speed TEXT,
  searched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permite select e insert para usuários anônimos (via anon key)
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert search_history"
  ON search_history FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view search_history"
  ON search_history FOR SELECT
  TO anon
  USING (true);
