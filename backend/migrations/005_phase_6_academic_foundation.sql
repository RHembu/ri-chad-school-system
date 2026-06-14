-- Phase 6 – Academic & School Structure Foundation

BEGIN;

-- =========================
-- 1. Enhance schools table
-- =========================

ALTER TABLE schools
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS motto VARCHAR(255),
ADD COLUMN IF NOT EXISTS school_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS academic_system VARCHAR(20),
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS website VARCHAR(255),
ADD COLUMN IF NOT EXISTS principal_name VARCHAR(150),
ADD COLUMN IF NOT EXISTS registration_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS registration_details TEXT;

-- Optional safety checks
ALTER TABLE schools
DROP CONSTRAINT IF EXISTS schools_school_type_check;

ALTER TABLE schools
ADD CONSTRAINT schools_school_type_check
CHECK (
  school_type IS NULL OR school_type IN (
    'PRIMARY',
    'SECONDARY',
    'COLLEGE',
    'VOCATIONAL'
  )
);

ALTER TABLE schools
DROP CONSTRAINT IF EXISTS schools_academic_system_check;

ALTER TABLE schools
ADD CONSTRAINT schools_academic_system_check
CHECK (
  academic_system IS NULL OR academic_system IN (
    'TERM',
    'SEMESTER'
  )
);

-- =========================
-- 2. Academic Years
-- =========================

CREATE TABLE IF NOT EXISTS academic_years (
  id SERIAL PRIMARY KEY,
  school_id INTEGER NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  year_name VARCHAR(20) NOT NULL,
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT academic_years_status_check
  CHECK (status IN ('DRAFT', 'ACTIVE', 'CLOSED')),

  CONSTRAINT unique_school_year_name
  UNIQUE (school_id, year_name)
);

-- Only one active academic year per school
CREATE UNIQUE INDEX IF NOT EXISTS unique_active_academic_year_per_school
ON academic_years (school_id)
WHERE is_active = TRUE;

-- =========================
-- 3. Academic Periods
-- =========================

CREATE TABLE IF NOT EXISTS academic_periods (
  id SERIAL PRIMARY KEY,
  school_id INTEGER NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  period_name VARCHAR(50) NOT NULL,
  period_type VARCHAR(20) NOT NULL,
  period_order INTEGER NOT NULL,
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT academic_periods_type_check
  CHECK (period_type IN ('TERM', 'SEMESTER')),

  CONSTRAINT academic_periods_status_check
  CHECK (status IN ('DRAFT', 'ACTIVE', 'CLOSED')),

  CONSTRAINT unique_period_per_year
  UNIQUE (school_id, academic_year_id, period_name)
);

-- =========================
-- 4. Grade Levels
-- =========================

CREATE TABLE IF NOT EXISTS grade_levels (
  id SERIAL PRIMARY KEY,
  school_id INTEGER NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  grade_name VARCHAR(100) NOT NULL,
  grade_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_grade_level_per_school
  UNIQUE (school_id, grade_name)
);

-- =========================
-- 5. Classes
-- =========================

CREATE TABLE IF NOT EXISTS classes (
  id SERIAL PRIMARY KEY,
  school_id INTEGER NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  grade_level_id INTEGER NOT NULL REFERENCES grade_levels(id) ON DELETE CASCADE,
  class_name VARCHAR(100) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_class_per_grade
  UNIQUE (school_id, grade_level_id, class_name)
);

-- =========================
-- 6. Streams
-- =========================

CREATE TABLE IF NOT EXISTS streams (
  id SERIAL PRIMARY KEY,
  school_id INTEGER NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  stream_name VARCHAR(50) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_stream_per_class
  UNIQUE (school_id, class_id, stream_name)
);

COMMIT;