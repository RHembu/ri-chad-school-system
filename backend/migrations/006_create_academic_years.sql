CREATE TABLE IF NOT EXISTS academic_years (
  id SERIAL PRIMARY KEY,

  school_id INTEGER NOT NULL REFERENCES schools(id) ON DELETE CASCADE,

  year_name VARCHAR(20) NOT NULL,

  is_active BOOLEAN DEFAULT false,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (school_id, year_name)
);

CREATE TABLE IF NOT EXISTS academic_periods (
  id SERIAL PRIMARY KEY,

  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,

  school_id INTEGER NOT NULL REFERENCES schools(id) ON DELETE CASCADE,

  period_name VARCHAR(50) NOT NULL,

  period_type VARCHAR(20) NOT NULL,

  start_date DATE,
  end_date DATE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (academic_year_id, period_name)
);
